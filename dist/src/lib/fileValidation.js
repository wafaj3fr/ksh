"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIME_TYPE_EXTENSIONS = exports.FILE_SIZE_LIMITS = void 0;
exports.validateFileType = validateFileType;
exports.validateFileSize = validateFileSize;
exports.validateFileExtension = validateFileExtension;
exports.validateUploadedFile = validateUploadedFile;
exports.validateMultipleFiles = validateMultipleFiles;
const validation_1 = require("./validation");
exports.FILE_SIZE_LIMITS = {
    CV: 10 * 1024 * 1024,
    COVER_LETTER: 5 * 1024 * 1024,
    ATTACHMENT: 10 * 1024 * 1024,
};
exports.MIME_TYPE_EXTENSIONS = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};
async function validateFileType(buffer, expectedMimeType) {
    try {
        const fileTypeModule = await Promise.resolve().then(() => __importStar(require('file-type')));
        const fromBufferFn = typeof fileTypeModule.fromBuffer === 'function'
            ? fileTypeModule.fromBuffer
            : typeof fileTypeModule.fileTypeFromBuffer === 'function'
                ? fileTypeModule.fileTypeFromBuffer
                : typeof fileTypeModule.default === 'function'
                    ? fileTypeModule.default
                    : typeof fileTypeModule.default?.fromBuffer === 'function'
                        ? fileTypeModule.default.fromBuffer.bind(fileTypeModule.default)
                        : null;
        if (!fromBufferFn) {
            throw new Error('file-type fromBuffer function not available');
        }
        const detectedType = await fromBufferFn(buffer);
        if (!detectedType) {
            return validation_1.allowedFileTypes.includes(expectedMimeType);
        }
        return detectedType.mime === expectedMimeType;
    }
    catch (error) {
        console.error('Error validating file type:', error);
        return false;
    }
}
function validateFileSize(size, maxSize) {
    return size > 0 && size <= maxSize;
}
function validateFileExtension(fileName, allowedExtensions) {
    const extension = fileName.toLowerCase().split('.').pop();
    return extension ? allowedExtensions.includes(extension) : false;
}
async function validateUploadedFile(file, fileName, mimeType, maxSize = exports.FILE_SIZE_LIMITS.CV) {
    const errors = [];
    const fileSize = file instanceof File ? file.size : file.length;
    if (!validateFileSize(fileSize, maxSize)) {
        errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
    }
    if (!validation_1.allowedFileTypes.includes(mimeType)) {
        errors.push('Only PDF, DOC, and DOCX files are allowed');
    }
    const allowedExtensions = Object.values(exports.MIME_TYPE_EXTENSIONS);
    if (!validateFileExtension(fileName, allowedExtensions)) {
        errors.push('File must have a valid extension (.pdf, .doc, or .docx)');
    }
    let buffer;
    if (file instanceof File) {
        buffer = Buffer.from(await file.arrayBuffer());
    }
    else {
        buffer = file;
    }
    const isValidType = await validateFileType(buffer, mimeType);
    if (!isValidType) {
        errors.push('File content does not match the expected file type');
    }
    const maliciousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /onload\s*=/gi,
        /onerror\s*=/gi,
    ];
    const fileContent = buffer.toString('utf8', 0, Math.min(buffer.length, 1024));
    for (const pattern of maliciousPatterns) {
        if (pattern.test(fileContent)) {
            errors.push('File contains potentially malicious content');
            break;
        }
    }
    return {
        isValid: errors.length === 0,
        errors,
        fileInfo: {
            name: fileName,
            size: fileSize,
            type: mimeType,
            extension: fileName.toLowerCase().split('.').pop() || '',
        },
    };
}
async function validateMultipleFiles(files, maxSize = exports.FILE_SIZE_LIMITS.ATTACHMENT) {
    const results = await Promise.all(files.map(file => validateUploadedFile(file, file.name, file.type, maxSize)));
    const isValid = results.every(result => result.isValid);
    return { isValid, results };
}
//# sourceMappingURL=fileValidation.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadContactFiles = exports.uploadJobApplicationFiles = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF, DOC, DOCX, and TXT files are allowed.`));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 10,
    },
    fileFilter: fileFilter
});
exports.uploadJobApplicationFiles = upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'coverLetterFile', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }
]);
exports.uploadContactFiles = upload.fields([
    { name: 'attachments', maxCount: 3 }
]);
exports.default = upload;
//# sourceMappingURL=upload.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHtml = sanitizeHtml;
exports.sanitizeEmail = sanitizeEmail;
exports.sanitizeText = sanitizeText;
exports.sanitizePhone = sanitizePhone;
exports.sanitizeFileName = sanitizeFileName;
exports.sanitizeFormData = sanitizeFormData;
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = require("jsdom");
const validator_1 = __importDefault(require("validator"));
const window = new jsdom_1.JSDOM('').window;
const purify = (0, dompurify_1.default)(window);
function sanitizeHtml(dirty) {
    return purify.sanitize(dirty, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
    });
}
function sanitizeEmail(email) {
    const sanitized = validator_1.default.normalizeEmail(email.trim().toLowerCase()) || '';
    return validator_1.default.isEmail(sanitized) ? sanitized : '';
}
function sanitizeText(text) {
    if (!text || typeof text !== 'string')
        return '';
    let sanitized = sanitizeHtml(text);
    sanitized = sanitized.trim();
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    return sanitized;
}
function sanitizePhone(phone) {
    if (!phone || typeof phone !== 'string')
        return '';
    let sanitized = phone.trim();
    sanitized = sanitized.replace(/[^\d+]/g, '');
    if (sanitized.includes('+')) {
        const parts = sanitized.split('+');
        sanitized = '+' + parts.join('');
    }
    return sanitized;
}
function sanitizeFileName(fileName) {
    if (!fileName || typeof fileName !== 'string')
        return '';
    let sanitized = fileName.replace(/[\/\\:*?"<>|]/g, '');
    sanitized = sanitized.replace(/^[.\s]+|[.\s]+$/g, '');
    if (sanitized.length > 255) {
        const ext = sanitized.split('.').pop();
        const name = sanitized.substring(0, 255 - (ext?.length || 0) - 1);
        sanitized = ext ? `${name}.${ext}` : name;
    }
    return sanitized || 'file';
}
function sanitizeFormData(data) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            switch (key) {
                case 'email':
                    sanitized[key] = sanitizeEmail(value);
                    break;
                case 'phone':
                    sanitized[key] = sanitizePhone(value);
                    break;
                default:
                    sanitized[key] = sanitizeText(value);
            }
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}
//# sourceMappingURL=sanitization.js.map
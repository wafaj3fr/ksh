"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeMiddleware = void 0;
exports.sanitizeInput = sanitizeInput;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const sanitizeMiddleware = (req, res, next) => {
    const sanitize = (value) => {
        if (typeof value === "string") {
            return (0, sanitize_html_1.default)(value, {
                allowedTags: [],
                allowedAttributes: {},
            }).trim();
        }
        if (typeof value === "object" && value !== null) {
            const cleanObj = {};
            for (const key in value)
                cleanObj[key] = sanitize(value[key]);
            return cleanObj;
        }
        return value;
    };
    req.body = sanitize(req.body);
    next();
};
exports.sanitizeMiddleware = sanitizeMiddleware;
function sanitizeInput(data) {
    const sanitized = {};
    for (const key in data) {
        if (typeof data[key] === "string") {
            sanitized[key] = data[key]
                .replace(/<[^>]*>?/gm, "")
                .trim()
                .replace(/\s+/g, " ");
        }
        else {
            sanitized[key] = data[key];
        }
    }
    return sanitized;
}
//# sourceMappingURL=sanitizeInput.js.map
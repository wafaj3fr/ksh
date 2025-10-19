"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.saveFileToDisk = saveFileToDisk;
exports.deleteTempFile = deleteTempFile;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const file_type_1 = require("file-type");
const uuid_1 = require("uuid");
const UPLOAD_DIR = path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(UPLOAD_DIR)) {
    fs_1.default.mkdirSync(UPLOAD_DIR);
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
        const uniqueName = `${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname).toLowerCase()}`;
        cb(null, uniqueName);
    },
});
async function validateFileContent(filePath, declaredMime) {
    try {
        const buffer = fs_1.default.readFileSync(filePath);
        const detected = await (0, file_type_1.fromBuffer)(buffer);
        if (!detected) {
            throw new Error("Unable to detect file type.");
        }
        const allowedMimes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedMimes.includes(declaredMime) || !allowedMimes.includes(detected.mime)) {
            throw new Error("File content type does not match allowed formats.");
        }
        return true;
    }
    catch (err) {
        throw new Error("File content validation failed: " + err.message);
    }
}
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: async (req, file, cb) => {
        try {
            const allowedMimes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (!allowedMimes.includes(file.mimetype)) {
                return cb(new Error("❌ Only PDF, DOC, or DOCX files are allowed."));
            }
            cb(null, true);
        }
        catch (err) {
            cb(new Error("❌ File validation failed."));
        }
    },
});
async function saveFileToDisk(file) {
    const fullPath = path_1.default.join(UPLOAD_DIR, file.filename);
    await validateFileContent(fullPath, file.mimetype);
    return {
        filename: file.filename,
        path: fullPath,
        size: file.size,
        mimeType: file.mimetype,
    };
}
function deleteTempFile(filePath) {
    try {
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
            console.log(`🧹 Temp file deleted: ${filePath}`);
        }
    }
    catch (err) {
        console.warn("⚠️ Failed to delete temp file:", err);
    }
}
//# sourceMappingURL=upload.js.map
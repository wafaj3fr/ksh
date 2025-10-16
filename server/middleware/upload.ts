import multer from "multer";
import path from "path";
import fs from "fs";
import { fromBuffer } from "file-type";
import { v4 as uuidv4 } from "uuid";

/**
 * 📂 Secure Upload Middleware for CV/Document Files
 * - Validates MIME type
 * - Verifies file content using magic bytes
 * - Limits size (10MB)
 * - Renames file with UUID
 */

// ------------------------------
// 🗂 1. Create / Ensure Upload Folder
// ------------------------------
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

// ------------------------------
// ⚙️ 2. Configure Multer Storage
// ------------------------------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname).toLowerCase()}`;
    cb(null, uniqueName);
  },
});

// ------------------------------
// 🧠 3. File Validation Function
// ------------------------------
async function validateFileContent(filePath: string, declaredMime: string) {
  try {
    const buffer = fs.readFileSync(filePath);
    const detected = await fromBuffer(buffer);

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
  } catch (err: any) {
    throw new Error("File content validation failed: " + err.message);
  }
}

// ------------------------------
// 🔒 4. Configure Multer with Security
// ------------------------------
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
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
    } catch (err) {
      cb(new Error("❌ File validation failed."));
    }
  },
});

// ------------------------------
// 💾 5. Safe File Save Helper
// ------------------------------
export async function saveFileToDisk(file: Express.Multer.File) {
  const fullPath = path.join(UPLOAD_DIR, file.filename);

  // 🧪 Verify content after upload
  await validateFileContent(fullPath, file.mimetype);

  // ✅ Return metadata for controllers
  return {
    filename: file.filename,
    path: fullPath,
    size: file.size,
    mimeType: file.mimetype,
  };
}

// ------------------------------
// 🧹 6. Optional Auto-cleaner (for temp files)
// ------------------------------
export function deleteTempFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Temp file deleted: ${filePath}`);
    }
  } catch (err) {
    console.warn("⚠️ Failed to delete temp file:", err);
  }
}

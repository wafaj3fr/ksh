import express from "express";
import { contactController } from "../controllers/contactController";
import { jobApplicationController } from "../controllers/jobApplicationController";
import { upload } from "../middleware/upload";
import { errorHandler } from "../middleware/errorHandler";

const router = express.Router();

/**
 * 📨 CONTACT FORM — POST /api/forms/contact
 * Validates + sanitizes + stores message in Sanity
 */
router.post("/contact", contactController.submit);

/**
 * 💼 JOB APPLICATION — POST /api/forms/apply
 * Uses multer for file upload + full validation pipeline
 */
router.post(
  "/apply",
  upload.single("cv"), // middleware handles file validation
  jobApplicationController.submit
);

// Unified error handler (must be last)
router.use(errorHandler);

export default router;

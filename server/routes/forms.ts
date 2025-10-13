import express from "express";
import { upload } from "../middleware/upload";
import { submitJobApplication } from "../controllers/jobApplicationController";
import { submitContactForm } from "../controllers/contactController";

const router = express.Router();

// ✅ Job application route
router.post("/apply", upload.single("cv"), submitJobApplication);

// ✅ Contact form route
router.post("/contact", express.json(), submitContactForm);

export default router;

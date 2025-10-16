import { Request, Response, NextFunction } from "express";
import { sanityClient as client } from "../config/sanityClient";
import { sanitizeInput } from "../middleware/sanitizeInput";
import { jobApplicationSchema } from "../validation/schemas";
import { saveFileToDisk } from "../middleware/upload";

/**
 * 🧾 Handles job applications
 * Validates form data + file + saves to Sanity
 */
export const jobApplicationController = {
  async submit(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // 🧼 Step 1: Sanitize & validate fields
      const cleanData = sanitizeInput(req.body);
      const parsed = jobApplicationSchema.safeParse(cleanData);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: parsed.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }

      // 📄 Step 2: Check file existence
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Missing CV file",
          details: [{ field: "cv", message: "Please attach your CV file." }],
        });
      }

      // 💾 Step 3: Validate and save the file
      const savedFile = await saveFileToDisk(req.file);

      // 🧱 Step 4: Save validated record to Sanity
      await client.create({
        _type: "jobApplication",
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || "",
        coverLetter: parsed.data.coverLetter,
        cvFileName: savedFile.filename,
        createdAt: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message: "✅ Application submitted successfully! Our HR team will contact you soon.",
      });
    } catch (err: any) {
      console.error("❌ JobApplicationController error:", err.message || err);
      return res.status(500).json({
        success: false,
        error: "Internal server error. Please try again later.",
      });
    }
  },
};

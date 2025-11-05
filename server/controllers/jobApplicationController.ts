import { Request, Response, NextFunction } from "express";
import { sanityClient as client } from "../config/sanityClient";
import { sanitizeInput } from "../middleware/sanitizeInput";
import { jobApplicationSchema } from "../validation/schemas";
import { saveFileToDisk } from "../middleware/upload";
import { getLocaleFromRequest, translate } from "../utils/i18n";

/**
 * 🧾 Handles job applications
 * Validates form data + file + saves to Sanity
 */
export const jobApplicationController = {
  async submit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // Get locale from request
    const locale = getLocaleFromRequest(req);

    try {
      // 🧼 Step 1: Sanitize & validate fields
      const cleanData = sanitizeInput(req.body);
      const parsed = jobApplicationSchema(locale).safeParse(cleanData);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: translate("errors.validationFailed", locale),
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
          error: translate("errors.validationFailed", locale),
          details: [
            { field: "cv", message: translate("errors.cvRequired", locale) },
          ],
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
        message: translate("success.applicationSubmitted", locale),
      });
    } catch (err: any) {
      console.error("❌ JobApplicationController error:", err.message || err);
      return res.status(500).json({
        success: false,
        error: translate("errors.serverError", locale),
      });
    }
  },
};

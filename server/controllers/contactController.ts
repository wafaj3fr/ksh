import { Request, Response, NextFunction } from "express";
import { contactFormSchema } from "../validation/schemas";
import { sanitizeInput } from "../middleware/sanitizeInput";
import { sanityClient as client } from "../config/sanityClient";

/**
 * 💬 Handles contact form submission
 * Validates + sanitizes + saves to Sanity
 */
export const contactController = {
  async submit(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // 🧼 Step 1: Sanitize & validate
      const cleanData = sanitizeInput(req.body);
      const parsed = contactFormSchema.safeParse(cleanData);

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

      const { fullName, email, subject, message } = parsed.data;

      // 🧱 Step 2: Save to Sanity
      await client.create({
        _type: "contactForm",
        fullName,
        email,
        subject: subject?.trim() || "No subject",
        message,
        createdAt: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message: "✅ Your message has been sent successfully! We will contact you soon.",
      });
    } catch (err: any) {
      console.error("❌ ContactController error:", err.message || err);
      return res.status(500).json({
        success: false,
        error: "Server error — please try again later.",
      });
    }
  },
};

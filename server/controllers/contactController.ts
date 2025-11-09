import { Request, Response, NextFunction } from "express";
import { contactFormSchema } from "../validation/schemas";
import { sanitizeInput } from "../middleware/sanitizeInput";
import { sanityClient as client } from "../config/sanityClient";
import { getLocaleFromRequest, translate } from "../utils/i18n";

/**
 * 💬 Handles contact form submission
 * Validates + sanitizes + saves to Sanity
 */
export const contactController = {
  async submit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // Get locale from request
    const locale = getLocaleFromRequest(req);

    try {
      // 🧼 Step 1: Sanitize & validate
      const cleanData = sanitizeInput(req.body);
      const parsed = contactFormSchema(locale).safeParse(cleanData);

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
        message: translate("success.contactSubmitted", locale),
      });
    } catch (err: any) {
      console.error("❌ ContactController error:", err.message || err);
      return res.status(500).json({
        success: false,
        error: translate("errors.serverError", locale),
      });
    }
  },
};

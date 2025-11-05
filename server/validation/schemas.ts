// server/validation/schemas.ts
import { z } from "zod";
import { translate, type Locale } from "../utils/i18n";

/* -------------------------------------------------------------
   🔹 COMMON FIELD SCHEMAS (Reusable validation rules)
------------------------------------------------------------- */

// ✅ Email
export const emailSchema = (locale: Locale = "en") =>
  z
    .string()
    .trim()
    .email(translate("errors.invalidEmail", locale))
    .max(100, translate("errors.emailTooLong", locale));

// ✅ Name
export const nameSchema = (locale: Locale = "en") =>
  z
    .string()
    .trim()
    .min(3, translate("errors.nameTooShort", locale))
    .max(100, translate("errors.nameTooLong", locale))
    .regex(
      /^[A-Za-z\u0600-\u06FF\s'-]+$/,
      translate("errors.nameInvalidChars", locale)
    );

// ✅ Phone (required)
export const phoneSchema = (locale: Locale = "en") =>
  z
    .string()
    .trim()
    .min(1, translate("errors.phoneRequired", locale))
    .regex(/^\+?[0-9\s()-]{7,14}$/, translate("errors.invalidPhone", locale))
    .refine(
      (phone) => {
        // Additional validation rules
        if (!phone || phone.trim().length === 0) return false; // Phone is required

        // Check for multiple + signs
        const plusCount = (phone.match(/\+/g) || []).length;
        if (plusCount > 1) return false;

        // Check that + is only at the beginning
        if (phone.includes("+") && !phone.startsWith("+")) return false;

        return true;
      },
      { message: translate("errors.invalidPhone", locale) }
    );

// ✅ Cover Letter
export const coverLetterSchema = (locale: Locale = "en") =>
  z
    .string()
    .trim()
    .min(50, translate("errors.coverLetterTooShort", locale))
    .max(3000, translate("errors.coverLetterTooLong", locale));

/* -------------------------------------------------------------
   🧩 JOB APPLICATION SCHEMA
------------------------------------------------------------- */
export const jobApplicationSchema = (locale: Locale = "en") =>
  z.object({
    jobId: z.string().min(3, translate("errors.jobIdRequired", locale)),
    fullName: nameSchema(locale),
    email: emailSchema(locale),
    phone: phoneSchema(locale),
    coverLetter: coverLetterSchema(locale),
  });

/* -------------------------------------------------------------
   ✉️ CONTACT FORM SCHEMA
------------------------------------------------------------- */
export const contactFormSchema = (locale: Locale = "en") =>
  z.object({
    fullName: nameSchema(locale),
    email: emailSchema(locale),
    subject: z
      .string()
      .trim()
      .min(5, translate("errors.subjectTooShort", locale))
      .max(150, translate("errors.subjectTooLong", locale))
      .optional()
      .or(z.literal("").transform(() => undefined)),
    message: z
      .string()
      .trim()
      .min(10, translate("errors.messageTooShort", locale))
      .max(3000, translate("errors.messageTooLong", locale)),
  });

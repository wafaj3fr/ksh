// server/validation/schemas.ts
import { z } from "zod";

/* -------------------------------------------------------------
   🔹 COMMON FIELD SCHEMAS (Reusable validation rules)
------------------------------------------------------------- */

// ✅ Email
export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email format")
  .max(100, "Email must be less than 100 characters");

// ✅ Name
export const nameSchema = z
  .string()
  .trim()
  .min(3, "Full name must be at least 3 characters")
  .max(100, "Full name must be less than 100 characters")
  .regex(/^[A-Za-z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes.");

// ✅ Phone (optional)
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9+\s()-]{8,15}$/, "Invalid phone format")
  .optional()
  .or(z.literal("").transform(() => undefined)); // يسمح بحقل فارغ

// ✅ Cover Letter
export const coverLetterSchema = z
  .string()
  .trim()
  .min(50, "Cover letter must be at least 50 characters")
  .max(3000, "Cover letter too long (max 3000 characters)");

/* -------------------------------------------------------------
   🧩 JOB APPLICATION SCHEMA
------------------------------------------------------------- */
export const jobApplicationSchema = z.object({
  jobId: z.string().min(3, "Job ID is required"),
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  coverLetter: coverLetterSchema,
});

/* -------------------------------------------------------------
   ✉️ CONTACT FORM SCHEMA
------------------------------------------------------------- */
export const contactFormSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(150, "Subject must be less than 150 characters")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message too long (max 3000 characters)"),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormSchema = exports.jobApplicationSchema = exports.coverLetterSchema = exports.phoneSchema = exports.nameSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z
    .string()
    .trim()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters");
exports.nameSchema = zod_1.z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes.");
exports.phoneSchema = zod_1.z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s()-]{7,14}$/, "Invalid phone format")
    .refine((phone) => {
    if (!phone || phone.trim().length === 0)
        return false;
    const plusCount = (phone.match(/\+/g) || []).length;
    if (plusCount > 1)
        return false;
    if (phone.includes("+") && !phone.startsWith("+"))
        return false;
    return true;
}, { message: "Invalid phone format" });
exports.coverLetterSchema = zod_1.z
    .string()
    .trim()
    .min(50, "Cover letter must be at least 50 characters")
    .max(3000, "Cover letter too long (max 3000 characters)");
exports.jobApplicationSchema = zod_1.z.object({
    jobId: zod_1.z.string().min(3, "Job ID is required"),
    fullName: exports.nameSchema,
    email: exports.emailSchema,
    phone: exports.phoneSchema,
    coverLetter: exports.coverLetterSchema,
});
exports.contactFormSchema = zod_1.z.object({
    fullName: exports.nameSchema,
    email: exports.emailSchema,
    subject: zod_1.z
        .string()
        .trim()
        .min(5, "Subject must be at least 5 characters")
        .max(150, "Subject must be less than 150 characters")
        .optional()
        .or(zod_1.z.literal("").transform(() => undefined)),
    message: zod_1.z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(3000, "Message too long (max 3000 characters)"),
});
//# sourceMappingURL=schemas.js.map
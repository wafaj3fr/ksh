"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentFileSchema = exports.cvFileSchema = exports.allowedFileTypes = exports.fileSchema = exports.contactFormSchema = exports.jobApplicationSchema = exports.honeypotSchema = exports.phoneSchema = exports.nameSchema = exports.emailSchema = void 0;
exports.validateJobApplication = validateJobApplication;
exports.validateContactForm = validateContactForm;
exports.validateFile = validateFile;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(255, 'Email must be less than 255 characters');
exports.nameSchema = zod_1.z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');
exports.phoneSchema = zod_1.z
    .string()
    .optional()
    .or(zod_1.z.literal(''))
    .refine((val) => {
    if (!val || val.trim() === '')
        return true;
    const cleaned = val.replace(/[\s\-\(\)]/g, '');
    const patterns = [
        /^\+[1-9]\d{7,14}$/,
        /^0[1-9]\d{7,13}$/,
        /^[1-9]\d{7,14}$/
    ];
    return patterns.some(pattern => pattern.test(cleaned));
}, {
    message: 'Please enter a valid phone number (e.g., +249125817547 or 0125817547)',
});
exports.honeypotSchema = zod_1.z
    .string()
    .max(0, 'Honeypot field must be empty')
    .optional()
    .or(zod_1.z.literal(''))
    .transform(e => (e === '' ? undefined : e));
exports.jobApplicationSchema = zod_1.z.object({
    jobId: zod_1.z.string().min(1, 'Job ID is required'),
    fullName: exports.nameSchema,
    email: exports.emailSchema,
    phone: exports.phoneSchema,
    coverLetter: zod_1.z
        .string()
        .min(50, 'Cover letter must be at least 50 characters')
        .max(2000, 'Cover letter must be less than 2000 characters'),
    honeypot: exports.honeypotSchema,
});
exports.contactFormSchema = zod_1.z.object({
    fullName: exports.nameSchema,
    email: exports.emailSchema,
    subject: zod_1.z
        .string()
        .min(5, 'Subject must be at least 5 characters')
        .max(200, 'Subject must be less than 200 characters')
        .optional(),
    message: zod_1.z
        .string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),
    honeypot: exports.honeypotSchema,
});
exports.fileSchema = zod_1.z.object({
    name: zod_1.z.string(),
    size: zod_1.z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
    type: zod_1.z.string(),
});
exports.allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
exports.cvFileSchema = exports.fileSchema.extend({
    type: zod_1.z.string().refine((type) => exports.allowedFileTypes.includes(type), { message: 'Only PDF, DOC, and DOCX files are allowed for CV' }),
});
exports.attachmentFileSchema = exports.fileSchema.extend({
    type: zod_1.z.string().refine((type) => exports.allowedFileTypes.includes(type), { message: 'Only PDF, DOC, and DOCX files are allowed' }),
});
function validateJobApplication(data) {
    return exports.jobApplicationSchema.safeParse(data);
}
function validateContactForm(data) {
    return exports.contactFormSchema.safeParse(data);
}
function validateFile(file, schema) {
    return schema.safeParse({
        name: file.name,
        size: file.size,
        type: file.type,
    });
}
//# sourceMappingURL=validation.js.map
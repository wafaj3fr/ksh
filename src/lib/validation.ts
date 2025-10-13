import { z } from 'zod'

// Common validation schemas
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(255, 'Email must be less than 255 characters')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')

export const phoneSchema = z
  .string()
  .optional()
  .or(z.literal(''))
  .refine((val) => {
    if (!val || val.trim() === '') return true; // Optional field or empty string
    
    // Remove all formatting characters (spaces, dashes, parentheses)
    const cleaned = val.replace(/[\s\-\(\)]/g, '');
    
    // Check for different phone number formats:
    // 1. International: +[country code][number] (e.g., +249125817547)
    // 2. Local: starts with 0 followed by non-zero digit (e.g., 0125817547)
    // 3. International without +: first digit 1-9 (e.g., 249125817547)
    
    const patterns = [
      /^\+[1-9]\d{7,14}$/, // International with + (8-15 digits total)
      /^0[1-9]\d{7,13}$/,  // Local starting with 0 then non-zero (9-15 digits total)
      /^[1-9]\d{7,14}$/    // International without + (8-15 digits total)
    ];
    
    return patterns.some(pattern => pattern.test(cleaned));
  }, {
    message: 'Please enter a valid phone number (e.g., +249125817547 or 0125817547)',
  })

// Honeypot schema (must be empty)
export const honeypotSchema = z
  .string()
  .max(0, 'Honeypot field must be empty')
  .optional()
  .or(z.literal(''))
  .transform(e => (e === '' ? undefined : e)); // Treat empty string as undefined

// Job Application Form Schema
export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  coverLetter: z
    .string()
    .min(50, 'Cover letter must be at least 50 characters')
    .max(2000, 'Cover letter must be less than 2000 characters'),
  honeypot: honeypotSchema,
})

export type JobApplicationData = z.infer<typeof jobApplicationSchema>

// Contact Form Schema
export const contactFormSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  honeypot: honeypotSchema,
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// File validation schemas
export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'), // 10MB limit
  type: z.string(),
})

export const allowedFileTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

export const cvFileSchema = fileSchema.extend({
  type: z.string().refine(
    (type) => allowedFileTypes.includes(type as (typeof allowedFileTypes)[number]),
    { message: 'Only PDF, DOC, and DOCX files are allowed for CV' }
  ),
})

export const attachmentFileSchema = fileSchema.extend({
  type: z.string().refine(
    (type) => allowedFileTypes.includes(type as (typeof allowedFileTypes)[number]),
    { message: 'Only PDF, DOC, and DOCX files are allowed' }
  ),
})

// Validation helper functions
export function validateJobApplication(data: unknown) {
  return jobApplicationSchema.safeParse(data)
}

export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data)
}

export function validateFile(file: File, schema: typeof cvFileSchema | typeof attachmentFileSchema) {
  return schema.safeParse({
    name: file.name,
    size: file.size,
    type: file.type,
  })
}

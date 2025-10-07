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
  .refine((val) => {
    if (!val) return true; // Optional field
    
    // Remove all formatting characters (spaces, dashes, parentheses)
    const cleaned = val.replace(/[\s\-\(\)]/g, '');
    
    // Check international phone format: optional +, then 1-15 digits, first digit 1-9
    return /^[\+]?[1-9][\d]{0,15}$/.test(cleaned);
  }, {
    message: 'Please enter a valid phone number',
  })

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
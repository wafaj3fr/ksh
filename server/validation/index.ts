// server/validation/index.ts
import { jobApplicationSchema, contactFormSchema } from './schemas';

// ✅ Validate Job Application
export const validateJobApplication = (data: any) => {
  const result = jobApplicationSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      details: result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    };
  }
  return { success: true, data: result.data };
};

// ✅ Validate Contact Form
export const validateContactForm = (data: any) => {
  const result = contactFormSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      details: result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    };
  }
  return { success: true, data: result.data };
};

// Export schemas for external use if needed
export { jobApplicationSchema, contactFormSchema };

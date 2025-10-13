import { createClient } from '@sanity/client';
import { validateJobApplication } from '../../../../lib/validation';
import { sanitizeFormData } from '../../../../lib/sanitization';
import { validateUploadedFile, FILE_SIZE_LIMITS } from '../../../../lib/fileValidation';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export interface JobApplicationData {
  jobId: string;
  fullName: string;
  email: string;
  phone?: string;
  coverLetter: string;
}

export interface JobApplicationFiles {
  cv: File;
  coverLetterFile?: File;
  attachments?: File[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  received?: string;
}

export interface JobApplicationResponse {
  success: boolean;
  id?: string;
  message?: string;
  error?: string;
  details?: string | ValidationError[];
}

async function uploadFileToSanity(file: File) {
  // Validate file before upload
  const validationResult = await validateUploadedFile(
    file,
    file.name,
    file.type,
    FILE_SIZE_LIMITS.CV
  );

  if (!validationResult.isValid) {
    throw new Error(`File validation failed: ${validationResult.errors.join(', ')}`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const asset = await sanity.assets.upload('file', buffer, {
    filename: validationResult.fileInfo?.name || file.name,
    contentType: file.type || 'application/octet-stream',
  });
  
  return asset;
}

export class JobApplicationController {
  
  static formatValidationError(issue: any, receivedValue?: string): ValidationError {
    const field = issue.path.join('.');
    let userFriendlyMessage = '';
    let userFriendlyField = '';

    // Convert field names to user-friendly labels
    switch (field) {
      case 'jobId':
        userFriendlyField = 'Job Position';
        break;
      case 'fullName':
        userFriendlyField = 'Full Name';
        break;
      case 'email':
        userFriendlyField = 'Email Address';
        break;
      case 'phone':
        userFriendlyField = 'Phone Number';
        break;
      case 'coverLetter':
        userFriendlyField = 'Cover Letter';
        break;
      default:
        userFriendlyField = field.charAt(0).toUpperCase() + field.slice(1);
    }

    // Create user-friendly messages based on validation type
    switch (issue.code) {
      case 'too_small':
        if (field === 'coverLetter') {
          userFriendlyMessage = `${userFriendlyField} must be at least ${issue.minimum} characters long. Please provide more details about your qualifications and experience.`;
        } else if (field === 'fullName') {
          userFriendlyMessage = `${userFriendlyField} must be at least ${issue.minimum} characters long. Please enter your complete name.`;
        } else {
          userFriendlyMessage = `${userFriendlyField} is required and must be at least ${issue.minimum} characters long.`;
        }
        break;
      
      case 'too_big':
        if (field === 'coverLetter') {
          userFriendlyMessage = `${userFriendlyField} must be less than ${issue.maximum} characters long. Please shorten your cover letter.`;
        } else {
          userFriendlyMessage = `${userFriendlyField} must be less than ${issue.maximum} characters long.`;
        }
        break;
      
      case 'invalid_string':
        if (field === 'email') {
          userFriendlyMessage = `Please enter a valid email address (e.g., john@example.com).`;
        } else {
          userFriendlyMessage = `${userFriendlyField} format is invalid.`;
        }
        break;
      
      case 'invalid_type':
        if (issue.expected === 'string' && issue.received === 'undefined') {
          userFriendlyMessage = `${userFriendlyField} is required. Please fill in this field.`;
        } else {
          userFriendlyMessage = `${userFriendlyField} must be a valid text entry.`;
        }
        break;
      
      case 'custom':
        // Handle custom validation messages (like phone number validation)
        if (field === 'phone') {
          userFriendlyMessage = `Please enter a valid phone number. Examples: +249125817547 (international) or 0125817547 (local).`;
        } else if (field === 'fullName') {
          userFriendlyMessage = `Full Name can only contain letters, spaces, hyphens, and apostrophes. Please remove any numbers or special characters.`;
        } else if (field === 'email') {
          userFriendlyMessage = `Please enter a valid email address in the format: name@domain.com`;
        } else {
          userFriendlyMessage = issue.message;
        }
        break;
      
      default:
        userFriendlyMessage = issue.message;
    }

    return {
      field: userFriendlyField,
      message: userFriendlyMessage,
      code: issue.code,
      received: receivedValue
    };
  }

  static async validateFormData(data: Record<string, unknown>): Promise<JobApplicationData> {
    // Sanitize input data
    const sanitizedData = sanitizeFormData(data);

    // Validate the sanitized data
    const validation = validateJobApplication(sanitizedData);
    if (!validation.success) {
      const validationErrors = validation.error.issues.map(issue => {
        const fieldPath = issue.path[0];
        const receivedValue = typeof fieldPath === 'string' ? String(data[fieldPath] || '') : '';
        return this.formatValidationError(issue, receivedValue);
      });
      
      const error = new Error('Please correct the following errors and try again:');
      (error as any).validationErrors = validationErrors;
      throw error;
    }

    return validation.data;
  }

  static async validateFiles(files: JobApplicationFiles): Promise<void> {
    // Validate CV is present
    if (!files.cv || files.cv.size === 0) {
      throw new Error('CV file is required. Please upload your resume in PDF, DOC, or DOCX format.');
    }

    // Validate CV file
    const cvValidation = await validateUploadedFile(
      files.cv,
      files.cv.name,
      files.cv.type,
      FILE_SIZE_LIMITS.CV
    );

    if (!cvValidation.isValid) {
      const errors = cvValidation.errors.join(', ');
      throw new Error(`CV file error: ${errors}. Please upload a valid PDF, DOC, or DOCX file under 10MB.`);
    }

    // Validate cover letter file if present
    if (files.coverLetterFile && files.coverLetterFile.size > 0) {
      const clValidation = await validateUploadedFile(
        files.coverLetterFile,
        files.coverLetterFile.name,
        files.coverLetterFile.type,
        FILE_SIZE_LIMITS.COVER_LETTER
      );

      if (!clValidation.isValid) {
        const errors = clValidation.errors.join(', ');
        throw new Error(`Cover letter file error: ${errors}. Please upload a valid PDF, DOC, or DOCX file under 5MB.`);
      }
    }

    // Validate attachments if present
    if (files.attachments && files.attachments.length > 0) {
      for (let i = 0; i < files.attachments.length; i++) {
        const attachment = files.attachments[i];
        if (attachment.size > 0) {
          const attValidation = await validateUploadedFile(
            attachment,
            attachment.name,
            attachment.type,
            FILE_SIZE_LIMITS.ATTACHMENT
          );

          if (!attValidation.isValid) {
            const errors = attValidation.errors.join(', ');
            throw new Error(`Attachment ${i + 1} (${attachment.name}) error: ${errors}. Please upload valid PDF, DOC, or DOCX files under 10MB.`);
          }
        }
      }
    }
  }

  static async uploadFiles(files: JobApplicationFiles) {
    const uploadResults = {
      cvAsset: null as any,
      clAsset: null as any,
      attAssets: [] as any[]
    };

    try {
      // Upload CV (required)
      uploadResults.cvAsset = await uploadFileToSanity(files.cv);

      // Upload cover letter file (optional)
      if (files.coverLetterFile && files.coverLetterFile.size > 0) {
        uploadResults.clAsset = await uploadFileToSanity(files.coverLetterFile);
      }

      // Upload attachments (optional)
      if (files.attachments && files.attachments.length > 0) {
        for (const file of files.attachments) {
          if (file && file.size > 0) {
            const asset = await uploadFileToSanity(file);
            uploadResults.attAssets.push(asset);
          }
        }
      }

      return uploadResults;
    } catch (error) {
      // Clean up any uploaded files on error
      // Note: In a production environment, you might want to implement cleanup logic
      throw error;
    }
  }

  static async createJobApplication(
    data: JobApplicationData,
    uploadResults: any
  ): Promise<any> {
    const { cvAsset, clAsset, attAssets } = uploadResults;

    // Create the job application document in Sanity
    const applicationDoc = {
      _type: 'jobApplication',
      job: { _type: 'reference', _ref: data.jobId },
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || '',
      coverLetter: data.coverLetter,
      cvFile: { 
        _type: 'file', 
        asset: { _type: 'reference', _ref: cvAsset._id } 
      },
      createdAt: new Date().toISOString(),
    };

    // Add optional files if they exist
    if (clAsset) {
      (applicationDoc as Record<string, unknown>).coverLetterFile = {
        _type: 'file',
        asset: { _type: 'reference', _ref: clAsset._id }
      };
    }

    if (attAssets.length > 0) {
      (applicationDoc as Record<string, unknown>).attachments = attAssets.map(asset => ({
        _type: 'file',
        asset: { _type: 'reference', _ref: asset._id }
      }));
    }

    const doc = await sanity.create(applicationDoc);
    return doc;
  }

  static async submitJobApplication(
    data: JobApplicationData,
    files: JobApplicationFiles
  ): Promise<JobApplicationResponse> {
    try {
      // Step 1: Validate files
      await this.validateFiles(files);

      // Step 2: Upload files
      const uploadResults = await this.uploadFiles(files);

      // Step 3: Create job application document
      const doc = await this.createJobApplication(data, uploadResults);

      return {
        success: true,
        id: doc._id,
        message: 'Your job application has been submitted successfully! We will review your application and contact you soon.'
      };

    } catch (error: unknown) {
      console.error('Job application submission error:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if ((error as any).validationErrors) {
          return {
            success: false,
            error: 'Validation Error',
            details: (error as any).validationErrors
          };
        }

        // File validation errors
        if (error.message.includes('CV file is required')) {
          return {
            success: false,
            error: 'Missing CV File',
            details: 'Please upload your CV/Resume. We accept PDF, DOC, and DOCX files up to 10MB.'
          };
        }

        if (error.message.includes('file error:') || 
            error.message.includes('validation failed')) {
          return {
            success: false,
            error: 'File Upload Error',
            details: error.message
          };
        }

        if (error.message.includes('FILE_TOO_LARGE')) {
          return {
            success: false,
            error: 'File Too Large',
            details: 'One or more files are too large. Please ensure all files are under 10MB for CV and attachments, or 5MB for cover letter.'
          };
        }

        // Network/upload errors
        if (error.message.includes('upload') || error.message.includes('network')) {
          return {
            success: false,
            error: 'Upload Failed',
            details: 'There was a problem uploading your files. Please check your internet connection and try again.'
          };
        }

        // Sanity API errors
        if (error.message.includes('SANITY') || error.message.includes('create')) {
          return {
            success: false,
            error: 'Submission Failed',
            details: 'We encountered a technical issue while processing your application. Please try again in a few minutes.'
          };
        }

        // Generic error with specific message
        return {
          success: false,
          error: 'Application Error',
          details: error.message
        };
      }

      return {
        success: false,
        error: 'Unexpected Error',
        details: 'An unexpected error occurred. Please try again later or contact support if the problem persists.'
      };
    }
  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationController = void 0;
const client_1 = require("@sanity/client");
const validation_1 = require("../../src/lib/validation");
const sanitization_1 = require("../../src/lib/sanitization");
const fileValidation_1 = require("../../src/lib/fileValidation");
const sanity = (0, client_1.createClient)({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});
function createFileAdapter(file) {
    return {
        size: file.size,
        name: file.originalname,
        type: file.mimetype,
        lastModified: Date.now(),
        webkitRelativePath: '',
        arrayBuffer: async () => file.buffer.buffer.slice(file.buffer.byteOffset, file.buffer.byteOffset + file.buffer.byteLength),
        slice: () => new Blob(),
        stream: () => new ReadableStream(),
        text: async () => file.buffer.toString(),
        bytes: async () => new Uint8Array(file.buffer)
    };
}
async function uploadFileToSanity(file) {
    const fileAdapter = createFileAdapter(file);
    const validationResult = await (0, fileValidation_1.validateUploadedFile)(fileAdapter, file.originalname, file.mimetype, fileValidation_1.FILE_SIZE_LIMITS.CV);
    if (!validationResult.isValid) {
        throw new Error(`File validation failed: ${validationResult.errors.join(', ')}`);
    }
    const asset = await sanity.assets.upload('file', file.buffer, {
        filename: validationResult.fileInfo?.name || file.originalname,
        contentType: file.mimetype || 'application/octet-stream',
    });
    return asset;
}
class JobApplicationController {
    static formatValidationError(issue, receivedValue) {
        const field = issue.path.join('.');
        let userFriendlyMessage = '';
        let userFriendlyField = '';
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
        switch (issue.code) {
            case 'too_small':
                if (field === 'coverLetter') {
                    userFriendlyMessage = `${userFriendlyField} must be at least ${issue.minimum} characters long. Please provide more details about your qualifications and experience.`;
                }
                else if (field === 'fullName') {
                    userFriendlyMessage = `${userFriendlyField} must be at least ${issue.minimum} characters long. Please enter your complete name.`;
                }
                else {
                    userFriendlyMessage = `${userFriendlyField} is required and must be at least ${issue.minimum} characters long.`;
                }
                break;
            case 'too_big':
                if (field === 'coverLetter') {
                    userFriendlyMessage = `${userFriendlyField} must be less than ${issue.maximum} characters long. Please shorten your cover letter.`;
                }
                else {
                    userFriendlyMessage = `${userFriendlyField} must be less than ${issue.maximum} characters long.`;
                }
                break;
            case 'invalid_string':
                if (field === 'email') {
                    userFriendlyMessage = `Please enter a valid email address (e.g., john@example.com).`;
                }
                else {
                    userFriendlyMessage = `${userFriendlyField} format is invalid.`;
                }
                break;
            case 'invalid_type':
                if (issue.expected === 'string' && issue.received === 'undefined') {
                    userFriendlyMessage = `${userFriendlyField} is required. Please fill in this field.`;
                }
                else {
                    userFriendlyMessage = `${userFriendlyField} must be a valid text entry.`;
                }
                break;
            case 'custom':
                if (field === 'phone') {
                    userFriendlyMessage = `Please enter a valid phone number. Examples: +249125817547 (international) or 0125817547 (local).`;
                }
                else if (field === 'fullName') {
                    userFriendlyMessage = `Full Name can only contain letters, spaces, hyphens, and apostrophes. Please remove any numbers or special characters.`;
                }
                else if (field === 'email') {
                    userFriendlyMessage = `Please enter a valid email address in the format: name@domain.com`;
                }
                else {
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
    static async validateFormData(data) {
        const sanitizedData = (0, sanitization_1.sanitizeFormData)(data);
        const validation = (0, validation_1.validateJobApplication)(sanitizedData);
        if (!validation.success) {
            const validationErrors = validation.error.issues.map(issue => {
                const fieldPath = issue.path[0];
                const receivedValue = typeof fieldPath === 'string' ? String(data[fieldPath] || '') : '';
                return this.formatValidationError(issue, receivedValue);
            });
            const error = new Error('Please correct the following errors and try again:');
            error.validationErrors = validationErrors;
            throw error;
        }
        return validation.data;
    }
    static async validateFiles(files) {
        if (!files.cv || files.cv.size === 0) {
            throw new Error('CV file is required. Please upload your resume in PDF, DOC, or DOCX format.');
        }
        const cvFile = createFileAdapter(files.cv);
        const cvValidation = await (0, fileValidation_1.validateUploadedFile)(cvFile, files.cv.originalname, files.cv.mimetype, fileValidation_1.FILE_SIZE_LIMITS.CV);
        if (!cvValidation.isValid) {
            const errors = cvValidation.errors.join(', ');
            throw new Error(`CV file error: ${errors}. Please upload a valid PDF, DOC, or DOCX file under 10MB.`);
        }
        if (files.coverLetterFile && files.coverLetterFile.size > 0) {
            const clFile = createFileAdapter(files.coverLetterFile);
            const clValidation = await (0, fileValidation_1.validateUploadedFile)(clFile, files.coverLetterFile.originalname, files.coverLetterFile.mimetype, fileValidation_1.FILE_SIZE_LIMITS.COVER_LETTER);
            if (!clValidation.isValid) {
                const errors = clValidation.errors.join(', ');
                throw new Error(`Cover letter file error: ${errors}. Please upload a valid PDF, DOC, or DOCX file under 5MB.`);
            }
        }
        if (files.attachments && files.attachments.length > 0) {
            for (let i = 0; i < files.attachments.length; i++) {
                const attachment = files.attachments[i];
                if (attachment && attachment.size > 0) {
                    const attFile = createFileAdapter(attachment);
                    const attValidation = await (0, fileValidation_1.validateUploadedFile)(attFile, attachment.originalname, attachment.mimetype, fileValidation_1.FILE_SIZE_LIMITS.ATTACHMENT);
                    if (!attValidation.isValid) {
                        const errors = attValidation.errors.join(', ');
                        throw new Error(`Attachment ${i + 1} (${attachment.originalname}) error: ${errors}. Please upload valid PDF, DOC, or DOCX files under 10MB.`);
                    }
                }
            }
        }
    }
    static async uploadFiles(files) {
        const uploadResults = {
            cvAsset: null,
            clAsset: null,
            attAssets: []
        };
        if (!files.cv) {
            throw new Error('CV file is required');
        }
        try {
            uploadResults.cvAsset = await uploadFileToSanity(files.cv);
            if (files.coverLetterFile && files.coverLetterFile.size > 0) {
                uploadResults.clAsset = await uploadFileToSanity(files.coverLetterFile);
            }
            if (files.attachments && files.attachments.length > 0) {
                for (const file of files.attachments) {
                    if (file && file.size > 0) {
                        const asset = await uploadFileToSanity(file);
                        uploadResults.attAssets.push(asset);
                    }
                }
            }
            return uploadResults;
        }
        catch (error) {
            throw error;
        }
    }
    static async createJobApplication(data, uploadResults) {
        const { cvAsset, clAsset, attAssets } = uploadResults;
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
        if (clAsset) {
            applicationDoc.coverLetterFile = {
                _type: 'file',
                asset: { _type: 'reference', _ref: clAsset._id }
            };
        }
        if (attAssets.length > 0) {
            applicationDoc.attachments = attAssets.map((asset) => ({
                _type: 'file',
                asset: { _type: 'reference', _ref: asset._id }
            }));
        }
        const doc = await sanity.create(applicationDoc);
        return doc;
    }
    static async submitJobApplication(data, files) {
        try {
            await this.validateFiles(files);
            const uploadResults = await this.uploadFiles(files);
            const doc = await this.createJobApplication(data, uploadResults);
            return {
                success: true,
                id: doc._id,
                message: 'Your job application has been submitted successfully! We will review your application and contact you soon.'
            };
        }
        catch (error) {
            console.error('Job application submission error:', error);
            if (error instanceof Error) {
                if (error.validationErrors) {
                    return {
                        success: false,
                        error: 'Validation Error',
                        details: error.validationErrors
                    };
                }
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
                if (error.message.includes('upload') || error.message.includes('network')) {
                    return {
                        success: false,
                        error: 'Upload Failed',
                        details: 'There was a problem uploading your files. Please check your internet connection and try again.'
                    };
                }
                if (error.message.includes('SANITY') || error.message.includes('create')) {
                    return {
                        success: false,
                        error: 'Submission Failed',
                        details: 'We encountered a technical issue while processing your application. Please try again in a few minutes.'
                    };
                }
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
    static async handleJobApplication(req, res) {
        try {
            const formData = {
                jobId: req.body.jobId,
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                coverLetter: req.body.coverLetter,
                honeypot: req.body.honeypot
            };
            const validatedData = await JobApplicationController.validateFormData(formData);
            const uploadedFiles = req.files;
            const files = {
                cv: uploadedFiles?.['cv']?.[0],
                coverLetterFile: uploadedFiles?.['coverLetterFile']?.[0],
                attachments: uploadedFiles?.['attachments']
            };
            const result = await JobApplicationController.submitJobApplication(validatedData, files);
            if (result.success) {
                res.status(200).json(result);
            }
            else {
                let statusCode = 400;
                if (result.error === 'Validation Error')
                    statusCode = 422;
                else if (result.error === 'File Too Large')
                    statusCode = 413;
                else if (result.error === 'Submission Failed')
                    statusCode = 500;
                res.status(statusCode).json(result);
            }
        }
        catch (error) {
            console.error('Express job application handler error:', error);
            if (error instanceof Error && error.validationErrors) {
                res.status(422).json({
                    success: false,
                    error: 'Validation Error',
                    details: error.validationErrors
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error',
                    details: 'An unexpected error occurred. Please try again later.'
                });
            }
        }
    }
}
exports.JobApplicationController = JobApplicationController;
//# sourceMappingURL=jobApplicationController.js.map
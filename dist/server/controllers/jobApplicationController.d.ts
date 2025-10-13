import { Request, Response } from 'express';
export interface JobApplicationData {
    jobId: string;
    fullName: string;
    email: string;
    phone?: string | undefined;
    coverLetter: string;
}
export interface JobApplicationFiles {
    cv?: Express.Multer.File | undefined;
    coverLetterFile?: Express.Multer.File | undefined;
    attachments?: Express.Multer.File[] | undefined;
}
export interface ValidationError {
    field: string;
    message: string;
    code: string;
    received?: string | undefined;
}
export interface JobApplicationResponse {
    success: boolean;
    id?: string;
    message?: string;
    error?: string;
    details?: string | ValidationError[];
}
export declare class JobApplicationController {
    static formatValidationError(issue: any, receivedValue?: string): ValidationError;
    static validateFormData(data: Record<string, unknown>): Promise<JobApplicationData>;
    static validateFiles(files: JobApplicationFiles): Promise<void>;
    static uploadFiles(files: JobApplicationFiles): Promise<{
        cvAsset: any;
        clAsset: any;
        attAssets: any[];
    }>;
    static createJobApplication(data: JobApplicationData, uploadResults: any): Promise<any>;
    static submitJobApplication(data: JobApplicationData, files: JobApplicationFiles): Promise<JobApplicationResponse>;
    static handleJobApplication(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=jobApplicationController.d.ts.map
import { z } from 'zod';
export declare const emailSchema: z.ZodString;
export declare const nameSchema: z.ZodString;
export declare const phoneSchema: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
export declare const honeypotSchema: z.ZodPipe<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>, z.ZodTransform<string | undefined, string | undefined>>;
export declare const jobApplicationSchema: z.ZodObject<{
    jobId: z.ZodString;
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    coverLetter: z.ZodString;
    honeypot: z.ZodPipe<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>, z.ZodTransform<string | undefined, string | undefined>>;
}, z.core.$strip>;
export type JobApplicationData = z.infer<typeof jobApplicationSchema>;
export declare const contactFormSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    subject: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    honeypot: z.ZodPipe<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>, z.ZodTransform<string | undefined, string | undefined>>;
}, z.core.$strip>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export declare const fileSchema: z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    type: z.ZodString;
}, z.core.$strip>;
export declare const allowedFileTypes: readonly ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export declare const cvFileSchema: z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    type: z.ZodString;
}, z.core.$strip>;
export declare const attachmentFileSchema: z.ZodObject<{
    name: z.ZodString;
    size: z.ZodNumber;
    type: z.ZodString;
}, z.core.$strip>;
export declare function validateJobApplication(data: unknown): z.ZodSafeParseResult<{
    jobId: string;
    fullName: string;
    email: string;
    coverLetter: string;
    honeypot: string | undefined;
    phone?: string | undefined;
}>;
export declare function validateContactForm(data: unknown): z.ZodSafeParseResult<{
    fullName: string;
    email: string;
    message: string;
    honeypot: string | undefined;
    subject?: string | undefined;
}>;
export declare function validateFile(file: File, schema: typeof cvFileSchema | typeof attachmentFileSchema): z.ZodSafeParseSuccess<{
    name: string;
    size: number;
    type: string;
}> | z.ZodSafeParseError<{
    name: string;
    size: number;
    type: string;
}>;
//# sourceMappingURL=validation.d.ts.map
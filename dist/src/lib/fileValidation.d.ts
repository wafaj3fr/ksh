export declare const FILE_SIZE_LIMITS: {
    readonly CV: number;
    readonly COVER_LETTER: number;
    readonly ATTACHMENT: number;
};
export declare const MIME_TYPE_EXTENSIONS: {
    readonly 'application/pdf': "pdf";
    readonly 'application/msword': "doc";
    readonly 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': "docx";
};
export declare function validateFileType(buffer: Buffer, expectedMimeType: string): Promise<boolean>;
export declare function validateFileSize(size: number, maxSize: number): boolean;
export declare function validateFileExtension(fileName: string, allowedExtensions: string[]): boolean;
export interface FileValidationResult {
    isValid: boolean;
    errors: string[];
    fileInfo?: {
        name: string;
        size: number;
        type: string;
        extension: string;
    };
}
export declare function validateUploadedFile(file: File | Buffer, fileName: string, mimeType: string, maxSize?: number): Promise<FileValidationResult>;
export declare function validateMultipleFiles(files: File[], maxSize?: number): Promise<{
    isValid: boolean;
    results: FileValidationResult[];
}>;
//# sourceMappingURL=fileValidation.d.ts.map
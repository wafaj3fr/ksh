export declare const config: {
    port: string | number;
    environment: string;
    frontendUrl: string;
    sanity: {
        projectId: string;
        dataset: string;
        apiVersion: string;
        writeToken: string;
    };
    fileUpload: {
        maxFileSize: number;
        maxFiles: number;
        allowedMimeTypes: string[];
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
};
export default config;
//# sourceMappingURL=index.d.ts.map
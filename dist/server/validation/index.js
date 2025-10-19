"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormSchema = exports.jobApplicationSchema = exports.validateContactForm = exports.validateJobApplication = void 0;
const schemas_1 = require("./schemas");
Object.defineProperty(exports, "jobApplicationSchema", { enumerable: true, get: function () { return schemas_1.jobApplicationSchema; } });
Object.defineProperty(exports, "contactFormSchema", { enumerable: true, get: function () { return schemas_1.contactFormSchema; } });
const validateJobApplication = (data) => {
    const result = schemas_1.jobApplicationSchema.safeParse(data);
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
exports.validateJobApplication = validateJobApplication;
const validateContactForm = (data) => {
    const result = schemas_1.contactFormSchema.safeParse(data);
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
exports.validateContactForm = validateContactForm;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationController = void 0;
const sanityClient_1 = require("../config/sanityClient");
const sanitizeInput_1 = require("../middleware/sanitizeInput");
const schemas_1 = require("../validation/schemas");
const upload_1 = require("../middleware/upload");
exports.jobApplicationController = {
    async submit(req, res, next) {
        try {
            const cleanData = (0, sanitizeInput_1.sanitizeInput)(req.body);
            const parsed = schemas_1.jobApplicationSchema.safeParse(cleanData);
            if (!parsed.success) {
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: parsed.error.issues.map((e) => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                });
            }
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "Missing CV file",
                    details: [{ field: "cv", message: "Please attach your CV file." }],
                });
            }
            const savedFile = await (0, upload_1.saveFileToDisk)(req.file);
            await sanityClient_1.sanityClient.create({
                _type: "jobApplication",
                fullName: parsed.data.fullName,
                email: parsed.data.email,
                phone: parsed.data.phone || "",
                coverLetter: parsed.data.coverLetter,
                cvFileName: savedFile.filename,
                createdAt: new Date().toISOString(),
            });
            return res.status(200).json({
                success: true,
                message: "✅ Application submitted successfully! Our HR team will contact you soon.",
            });
        }
        catch (err) {
            console.error("❌ JobApplicationController error:", err.message || err);
            return res.status(500).json({
                success: false,
                error: "Internal server error. Please try again later.",
            });
        }
    },
};
//# sourceMappingURL=jobApplicationController.js.map
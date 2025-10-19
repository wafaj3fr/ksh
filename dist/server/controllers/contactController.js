"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const schemas_1 = require("../validation/schemas");
const sanitizeInput_1 = require("../middleware/sanitizeInput");
const sanityClient_1 = require("../config/sanityClient");
exports.contactController = {
    async submit(req, res, next) {
        try {
            const cleanData = (0, sanitizeInput_1.sanitizeInput)(req.body);
            const parsed = schemas_1.contactFormSchema.safeParse(cleanData);
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
            const { fullName, email, subject, message } = parsed.data;
            await sanityClient_1.sanityClient.create({
                _type: "contactForm",
                fullName,
                email,
                subject: subject?.trim() || "No subject",
                message,
                createdAt: new Date().toISOString(),
            });
            return res.status(200).json({
                success: true,
                message: "✅ Your message has been sent successfully! We will contact you soon.",
            });
        }
        catch (err) {
            console.error("❌ ContactController error:", err.message || err);
            return res.status(500).json({
                success: false,
                error: "Server error — please try again later.",
            });
        }
    },
};
//# sourceMappingURL=contactController.js.map
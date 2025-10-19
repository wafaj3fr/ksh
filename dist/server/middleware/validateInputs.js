"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
const validateInputs = (schema, source = "body") => (req, res, next) => {
    try {
        const data = source === "body" ? req.body : source === "query" ? req.query : req.params;
        const result = schema.safeParse(data);
        if (!result.success) {
            const details = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details,
            });
        }
        if (source === "body")
            req.body = result.data;
        else if (source === "query")
            req.query = result.data;
        else
            req.params = result.data;
        return next();
    }
    catch (err) {
        console.error("❌ Validation middleware error:", err.message || err);
        return res.status(500).json({
            success: false,
            error: "Internal server error during validation",
            details: [{ message: err.message || "Unknown validation error" }],
        });
    }
};
exports.validateInputs = validateInputs;
//# sourceMappingURL=validateInputs.js.map
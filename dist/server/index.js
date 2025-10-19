"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const upload_1 = require("./middleware/upload");
const contactController_1 = require("./controllers/contactController");
const jobApplicationController_1 = require("./controllers/jobApplicationController");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "2mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "2mb" }));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.get("/", (_, res) => {
    res.status(200).json({
        success: true,
        message: "✅ KSH API is running successfully",
    });
});
app.post("/api/forms/contact", contactController_1.contactController.submit);
app.post("/api/forms/apply", upload_1.upload.single("cv"), jobApplicationController_1.jobApplicationController.submit);
app.use("/api", routes_1.default);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 KSH Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
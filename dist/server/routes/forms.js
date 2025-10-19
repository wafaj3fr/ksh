"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const jobApplicationController_1 = require("../controllers/jobApplicationController");
const upload_1 = require("../middleware/upload");
const errorHandler_1 = require("../middleware/errorHandler");
const router = express_1.default.Router();
router.post("/contact", contactController_1.contactController.submit);
router.post("/apply", upload_1.upload.single("cv"), jobApplicationController_1.jobApplicationController.submit);
router.use(errorHandler_1.errorHandler);
exports.default = router;
//# sourceMappingURL=forms.js.map
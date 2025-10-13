"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobApplicationController_1 = require("../controllers/jobApplicationController");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
router.post('/apply', upload_1.uploadJobApplicationFiles, jobApplicationController_1.JobApplicationController.handleJobApplication);
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        endpoints: {
            'POST /api/forms/apply': 'Submit job application',
        },
        timestamp: new Date().toISOString()
    });
});
exports.default = router;
//# sourceMappingURL=forms.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const client_1 = require("@sanity/client");
dotenv_1.default.config();
let sanity = null;
if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.SANITY_WRITE_TOKEN) {
    sanity = (0, client_1.createClient)({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: '2025-01-01',
        token: process.env.SANITY_WRITE_TOKEN,
        useCdn: false,
    });
}
else {
    console.warn('⚠️  Sanity credentials not found - running without Sanity integration');
}
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 10,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF, DOC, and DOCX files are allowed.`));
        }
    }
});
const uploadJobApplicationFiles = upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'coverLetterFile', maxCount: 1 },
    { name: 'attachments', maxCount: 5 }
]);
const app = (0, express_1.default)();
const PORT = process.env.API_PORT || 3001;
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
}));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});
app.get('/test', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Test Job Application API</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            input, select, textarea { width: 100%; padding: 8px; margin: 5px 0; }
            button { background: #007cba; color: white; padding: 10px 20px; border: none; cursor: pointer; }
            button:hover { background: #005a87; }
            .form-group { margin-bottom: 15px; }
            #result { margin-top: 20px; padding: 10px; border-radius: 4px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
            .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
        </style>
    </head>
    <body>
        <h1>Job Application API Test</h1>
        <form id="testForm" enctype="multipart/form-data">
            <div class="form-group">
                <label>Job Position:</label>
                <select name="jobId" required>
                    <option value="">Select Position</option>
                    <option value="software-engineer">Software Engineer</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="designer">UI/UX Designer</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" value="John Doe" required>
            </div>
            
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" value="john@example.com" required>
            </div>
            
            <div class="form-group">
                <label>Phone:</label>
                <input type="tel" name="phone" value="1234567890">
            </div>
            
            <div class="form-group">
                <label>Cover Letter:</label>
                <textarea name="coverLetter" rows="4" placeholder="Tell us why you're interested in this position...">I am very interested in this position because...</textarea>
            </div>
            
            <div class="form-group">
                <label>CV/Resume (PDF, DOC, DOCX):</label>
                <input type="file" name="cv" accept=".pdf,.doc,.docx">
            </div>
            
            <div class="form-group">
                <label>Cover Letter File (optional):</label>
                <input type="file" name="coverLetterFile" accept=".pdf,.doc,.docx">
            </div>
            
            <div class="form-group">
                <label>Additional Attachments (optional):</label>
                <input type="file" name="attachments" multiple accept=".pdf,.doc,.docx">
            </div>
            
            <button type="submit">Submit Application</button>
        </form>
        
        <div id="result"></div>

        <script>
            document.getElementById('testForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const resultDiv = document.getElementById('result');
                
                // Show loading state
                resultDiv.innerHTML = '<div>⏳ Submitting application...</div>';
                
                try {
                    const response = await fetch('/api/forms/apply', {
                        method: 'POST',
                        body: formData  // Send as FormData for file uploads
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        resultDiv.innerHTML = 
                            '<div class="success"><h3>✅ SUCCESS!</h3><pre>' + JSON.stringify(result, null, 2) + '</pre></div>';
                    } else {
                        resultDiv.innerHTML = 
                            '<div class="error"><h3>❌ ERROR</h3><pre>' + JSON.stringify(result, null, 2) + '</pre></div>';
                    }
                } catch (error) {
                    resultDiv.innerHTML = 
                        '<div class="error"><h3>❌ NETWORK ERROR</h3><pre>' + error.message + '</pre></div>';
                }
            });
        </script>
    </body>
    </html>
  `);
});
async function handleJobApplication(req, res) {
    try {
        const { jobId, fullName, email, phone, coverLetter } = req.body;
        const files = req.files;
        if (!jobId || !fullName || !email) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                details: 'Job ID, full name, and email are required fields'
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                details: 'Invalid email address format'
            });
        }
        const uploadedFiles = {};
        if (files.cv && files.cv[0]) {
            uploadedFiles.cv = {
                filename: files.cv[0].originalname,
                size: files.cv[0].size,
                mimetype: files.cv[0].mimetype
            };
        }
        if (files.coverLetterFile && files.coverLetterFile[0]) {
            uploadedFiles.coverLetterFile = {
                filename: files.coverLetterFile[0].originalname,
                size: files.coverLetterFile[0].size,
                mimetype: files.coverLetterFile[0].mimetype
            };
        }
        if (files.attachments && files.attachments.length > 0) {
            uploadedFiles.attachments = files.attachments.map(file => ({
                filename: file.originalname,
                size: file.size,
                mimetype: file.mimetype
            }));
        }
        const jobApplicationData = {
            id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            jobId,
            fullName,
            email,
            phone: phone || '',
            coverLetter: coverLetter || '',
            ...uploadedFiles,
            submittedAt: new Date().toISOString(),
            status: 'pending',
        };
        if (sanity) {
            try {
                if (files.cv && files.cv[0]) {
                    const cvAsset = await sanity.assets.upload('file', files.cv[0].buffer, {
                        filename: files.cv[0].originalname,
                    });
                    jobApplicationData.cv = {
                        _type: 'file',
                        asset: {
                            _type: 'reference',
                            _ref: cvAsset._id,
                        },
                    };
                }
                const sanityDoc = await sanity.create({
                    _type: 'jobApplication',
                    ...jobApplicationData,
                    jobId: {
                        _type: 'reference',
                        _ref: jobId,
                    },
                });
                console.log('✅ Job application saved to Sanity:', sanityDoc._id);
                jobApplicationData.id = sanityDoc._id;
            }
            catch (sanityError) {
                console.error('⚠️  Sanity save failed, continuing without:', sanityError);
            }
        }
        else {
            console.log('📝 Job application received:', jobApplicationData);
        }
        return res.status(201).json({
            success: true,
            id: jobApplicationData.id,
            message: 'Job application submitted successfully! We will review your application and get back to you soon.',
            data: {
                jobId,
                fullName,
                email,
                filesReceived: Object.keys(uploadedFiles)
            }
        });
    }
    catch (error) {
        console.error('❌ Error handling job application:', error);
        if (error.message?.includes('Invalid file type')) {
            return res.status(400).json({
                success: false,
                error: 'File Upload Error',
                details: error.message
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            details: 'An unexpected error occurred. Please try again later.'
        });
    }
}
app.post('/api/forms/apply', uploadJobApplicationFiles, handleJobApplication);
app.get('/api/forms/health', (req, res) => {
    res.json({
        status: 'OK',
        endpoints: {
            'POST /api/forms/apply': 'Submit job application',
        },
        timestamp: new Date().toISOString()
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `Route ${req.originalUrl} not found`
    });
});
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
        success: false,
        error: error.message || 'Internal Server Error'
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Express API server running on port ${PORT}`);
    console.log(`📱 Health check: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import routes from "./routes";

// ✅ Load environment variables early
dotenv.config();

// ✅ Import modules (Note: .js only if running from compiled /dist)
import { upload } from "./middleware/upload";
import { contactController } from "./controllers/contactController";
import { jobApplicationController } from "./controllers/jobApplicationController";
import { errorHandler } from "./middleware/errorHandler";

// ✅ Initialize Express app
const app = express();

// 🧠 Security Middleware
app.use(helmet());

// 🌐 CORS setup (frontend domain)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// 🧩 Body parsers
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// 🚦 Basic rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // max requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 🩺 Health Check Route
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "✅ KSH API is running successfully",
  });
});

// 📬 Contact Form Route
app.post("/api/forms/contact", contactController.submit);

// 💼 Job Application Route (with CV upload)
app.post("/api/forms/apply", upload.single("cv"), jobApplicationController.submit);

// ✅ Include any additional route modules (if exist)
app.use("/api", routes);

// ⚠️ Global Error Handler (must be last)
app.use(errorHandler);

// 🚀 Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 KSH Server running on port ${PORT}`);
});

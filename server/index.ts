import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import formRoutes from "./routes/forms";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/forms", formRoutes);

// Health check
app.get("/", (req, res) => res.send("✅ API is running..."));

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

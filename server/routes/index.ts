import express from "express";
import formsRouter from "./forms";

const router = express.Router();

/**
 * 🌐 Base API routes
 * Mounted in server/index.ts or app.ts
 */
router.use("/forms", formsRouter);

export default router;

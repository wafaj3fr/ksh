import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * ✅ Universal Zod validation middleware
 * Supports req.body, req.query, or req.params
 */
export const validateInputs =
  (schema: ZodSchema, source: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      const data =
        source === "body" ? req.body : source === "query" ? req.query : req.params;

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

      // ✅ Overwrite with validated and typed data
      if (source === "body") req.body = result.data;
      else if (source === "query") req.query = result.data as any;
      else req.params = result.data as any;

      return next();
    } catch (err: any) {
      console.error("❌ Validation middleware error:", err.message || err);
      return res.status(500).json({
        success: false,
        error: "Internal server error during validation",
        details: [{ message: err.message || "Unknown validation error" }],
      });
    }
  };

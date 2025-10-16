import { Request, Response, NextFunction } from "express";

/**
 * 🧩 Unified Global Error Handler
 * Formats all errors into a consistent JSON structure
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ Error caught:", err);

  // 🔹 Default response shape
  let statusCode = 500;
  let response = {
    success: false,
    error: "Internal Server Error",
    details: [] as { field?: string; message: string }[],
  };

  // 🔸 Multer / upload-related errors
  if (err.message?.includes("Only PDF")) {
    statusCode = 400;
    response.error = "Invalid file type";
    response.details.push({
      field: "cv",
      message: "Only PDF, DOC, or DOCX files are allowed.",
    });
  } else if (err.message?.includes("File content")) {
    statusCode = 400;
    response.error = "Invalid file content";
    response.details.push({
      field: "cv",
      message: "Uploaded file appears invalid. Please re-upload a valid document.",
    });
  } else if (err.message?.includes("too large")) {
    statusCode = 413;
    response.error = "File too large";
    response.details.push({
      field: "cv",
      message: "File exceeds the 10 MB size limit.",
    });
  }

  // 🔸 Zod validation errors (في حال وصل من غير ما يُمسك بالميدل وير)
  else if (err.name === "ZodError") {
    statusCode = 400;
    response.error = "Validation failed";
    response.details = err.issues.map((issue: any) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  // 🔸 Network / external API errors
  else if (err.name === "FetchError" || err.code === "ECONNREFUSED") {
    statusCode = 502;
    response.error = "External service unavailable";
    response.details.push({
      message: "Could not connect to external API or Sanity service.",
    });
  }

  // 🔸 Generic fallback
  else if (err.message) {
    response.error = err.message;
  }

  return res.status(statusCode).json(response);
}

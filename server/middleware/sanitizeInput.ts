import sanitizeHtml from "sanitize-html";
import { Request, Response, NextFunction } from "express";

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const sanitize = (value: any): any => {
    if (typeof value === "string") {
      return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();
    }
    if (typeof value === "object" && value !== null) {
      const cleanObj: Record<string, any> = {};
      for (const key in value) cleanObj[key] = sanitize(value[key]);
      return cleanObj;
    }
    return value;
  };

  req.body = sanitize(req.body);
  next();
};

export function sanitizeInput(data: Record<string, any>) {
  const sanitized: Record<string, any> = {};
  for (const key in data) {
    if (typeof data[key] === "string") {
      sanitized[key] = data[key]
        .replace(/<[^>]*>?/gm, "") // remove HTML tags
        .trim()
        .replace(/\s+/g, " "); // normalize spaces
    } else {
      sanitized[key] = data[key];
    }
  }
  return sanitized;
}

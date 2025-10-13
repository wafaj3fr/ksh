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

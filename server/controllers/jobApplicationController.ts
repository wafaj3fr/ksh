import { Request, Response } from "express";
import { z } from "zod";
import { client } from "../../src/sanity/lib/client";

const jobSchema = z.object({
  jobId: z.string().min(1, "Missing job ID"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters")
});

function validateFile(file?: Express.Multer.File) {
  if (!file) return "Resume / CV file is required";

  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if (!allowed.includes(file.mimetype)) return "Only PDF, DOC, DOCX files allowed";
  if (file.size > 10 * 1024 * 1024) return "File exceeds 10MB limit";

  return null;
}

export const submitJobApplication = async (req: Request, res: Response) => {
  try {
    const parsed = jobSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({
        details: parsed.error.issues.map(i => ({
          field: i.path[0],
          message: i.message
        }))
      });
    }

    const fileError = validateFile(req.file);
    if (fileError) {
      return res.status(422).json({
        details: [{ field: "cv", message: fileError }]
      });
    }

    const doc = await client.create({
      _type: "jobApplication",
      ...parsed.data,
      cvFileName: req.file?.originalname,
      cvFileType: req.file?.mimetype,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      ok: true,
      message: "Application submitted successfully!",
      id: doc._id,
    });
  } catch (err: any) {
    console.error("Job Application Error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

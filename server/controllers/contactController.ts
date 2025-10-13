import { Request, Response } from "express";
import { z } from "zod";
import { client } from "../../src/sanity/lib/client";

const contactSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({
        details: parsed.error.issues.map(i => ({
          field: i.path[0],
          message: i.message
        }))
      });
    }

    const doc = await client.create({
      _type: "contactForm",
      ...parsed.data,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully!",
      id: doc._id,
    });
  } catch (err: any) {
    console.error("Contact Form Error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

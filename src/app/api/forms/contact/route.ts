import { NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import { validateContactForm } from "../../../../lib/validation";
import { sanitizeFormData } from "../../../../lib/sanitization";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract raw form data
    const rawData = {
      fullName: String(formData.get("fullName") || ''),
      email: String(formData.get("email") || ''),
      subject: formData.get("subject") ? String(formData.get("subject")) : undefined,
      message: String(formData.get("message") || ''),
      honeypot: String(formData.get("honeypot") || ''),
    };

    // Sanitize input data
    const sanitizedData = sanitizeFormData(rawData);

    // Validate the sanitized data
    const validation = validateContactForm(sanitizedData);
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Validation failed',
        details: validation.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      }, { status: 400 });
    }

    const validData = validation.data;

    // Create contact form submission in Sanity
    await client.create({
      _type: "contactForm",
      fullName: validData.fullName,
      email: validData.email,
      subject: validData.subject || '',
      message: validData.message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return NextResponse.json({ 
      error: "Internal server error",
      details: "Please try again later"
    }, { status: 500 });
  }
}

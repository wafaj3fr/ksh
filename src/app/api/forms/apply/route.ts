import { NextRequest, NextResponse } from 'next/server';
import { JobApplicationController, type JobApplicationData, type JobApplicationFiles } from './controller';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // Extract form data
    const rawData = {
      jobId: String(form.get('jobId') || ''),
      fullName: String(form.get('fullName') || ''),
      email: String(form.get('email') || ''),
      phone: form.get('phone') ? String(form.get('phone')).trim() : '',
      coverLetter: String(form.get('coverLetter') || ''),
    };

    // Extract files
    const cv = form.get('cv') as File | null;
    const coverLetterFile = form.get('coverLetterFile') as File | null;
    const attachments = (form.getAll('attachments') as File[]).filter(f => f && f.size > 0);

    // Validate and sanitize data
    const validatedData: JobApplicationData = await JobApplicationController.validateFormData(rawData);

    // Prepare files object
    const files: JobApplicationFiles = {
      cv: cv!,
      coverLetterFile: coverLetterFile || undefined,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    // Submit application through controller
    const result = await JobApplicationController.submitJobApplication(validatedData, files);

    if (result.success) {
      return NextResponse.json({
        success: true,
        id: result.id,
        message: result.message
      }, { status: 200 });
    } else {
      // Determine appropriate status code based on error type
      let statusCode = 400; // Default to bad request
      
      if (result.error === 'Validation Error') {
        statusCode = 422; // Unprocessable Entity for validation errors
      } else if (result.error === 'File Too Large') {
        statusCode = 413; // Payload Too Large
      } else if (result.error === 'Upload Failed' || result.error === 'Submission Failed') {
        statusCode = 500; // Internal Server Error
      }

      return NextResponse.json({
        success: false,
        error: result.error,
        details: result.details
      }, { status: statusCode });
    }

  } catch (error: unknown) {
    console.error('Route error:', error);
    
    // Handle controller validation errors
    if (error instanceof Error && (error as any).validationErrors) {
      return NextResponse.json({
        success: false,
        error: 'Validation Error', 
        details: (error as any).validationErrors
      }, { status: 422 });
    }

    // Handle other errors
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('CV file is required')) {
        return NextResponse.json({
          success: false,
          error: 'Missing Required File',
          details: 'CV file is required. Please upload your resume.'
        }, { status: 400 });
      }

      if (error.message.includes('multipart/form-data')) {
        return NextResponse.json({
          success: false,
          error: 'Invalid Request Format',
          details: 'Please submit the form with proper file attachments.'
        }, { status: 400 });
      }

      return NextResponse.json({
        success: false,
        error: 'Request Processing Error',
        details: 'There was an error processing your request. Please check your inputs and try again.'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Server Error',
      details: 'An unexpected server error occurred. Please try again later.'
    }, { status: 500 });
  }
}

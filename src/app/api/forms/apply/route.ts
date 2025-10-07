import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { validateJobApplication } from '../../../../lib/validation';
import { sanitizeFormData } from '../../../../lib/sanitization';
import { validateUploadedFile, FILE_SIZE_LIMITS } from '../../../../lib/fileValidation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function uploadFileToSanity(file: File) {
  // Validate file before upload
  const validationResult = await validateUploadedFile(
    file,
    file.name,
    file.type,
    FILE_SIZE_LIMITS.CV
  );

  if (!validationResult.isValid) {
    throw new Error(`File validation failed: ${validationResult.errors.join(', ')}`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const asset = await sanity.assets.upload('file', buffer, {
    filename: validationResult.fileInfo?.name || file.name,
    contentType: file.type || 'application/octet-stream',
  });
  
  return asset;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // Extract and sanitize form data
    const rawData = {
      jobId: String(form.get('jobId') || ''),
      fullName: String(form.get('fullName') || ''),
      email: String(form.get('email') || ''),
      phone: form.get('phone') ? String(form.get('phone')) : undefined,
      coverLetter: String(form.get('coverLetter') || ''),
    };

    // Sanitize input data
    const sanitizedData = sanitizeFormData(rawData);

    // Validate the sanitized data
    const validation = validateJobApplication(sanitizedData);
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

    // Handle file uploads
    const cv = form.get('cv') as File | null;
    if (!cv || cv.size === 0) {
      return NextResponse.json({ error: 'CV file is required' }, { status: 400 });
    }

    const coverLetterFile = form.get('coverLetterFile') as File | null;
    const attachments = (form.getAll('attachments') as File[]).filter(f => f && f.size > 0);

    // Upload CV (required)
    const cvAsset = await uploadFileToSanity(cv);

    // Upload cover letter file (optional)
    let clAsset = null;
    if (coverLetterFile && coverLetterFile.size > 0) {
      clAsset = await uploadFileToSanity(coverLetterFile);
    }

    // Upload attachments (optional)
    const attAssets = [];
    for (const file of attachments) {
      if (file && file.size > 0) {
        const asset = await uploadFileToSanity(file);
        attAssets.push(asset);
      }
    }

    // Create the job application document in Sanity
    const applicationDoc = {
      _type: 'jobApplication',
      job: { _type: 'reference', _ref: validData.jobId },
      fullName: validData.fullName,
      email: validData.email,
      phone: validData.phone || '',
      coverLetter: validData.coverLetter,
      cvFile: { 
        _type: 'file', 
        asset: { _type: 'reference', _ref: cvAsset._id } 
      },
      createdAt: new Date().toISOString(),
    };

    // Add optional files if they exist
    if (clAsset) {
      (applicationDoc as Record<string, unknown>).coverLetterFile = {
        _type: 'file',
        asset: { _type: 'reference', _ref: clAsset._id }
      };
    }

    if (attAssets.length > 0) {
      (applicationDoc as Record<string, unknown>).attachments = attAssets.map(asset => ({
        _type: 'file',
        asset: { _type: 'reference', _ref: asset._id }
      }));
    }

    const doc = await sanity.create(applicationDoc);

    return NextResponse.json({ 
      success: true, 
      id: doc._id,
      message: 'Application submitted successfully'
    });

  } catch (error: unknown) {
    console.error('Job application submission error:', error);
    
    // Handle specific error types
    if (error instanceof Error && error.message.includes('File validation failed')) {
      return NextResponse.json({ 
        error: 'File validation error',
        details: error.message
      }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes('FILE_TOO_LARGE')) {
      return NextResponse.json({ 
        error: 'File too large',
        details: 'Files must be smaller than 10MB'
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Internal server error',
      details: 'Please try again later'
    }, { status: 500 });
  }
}

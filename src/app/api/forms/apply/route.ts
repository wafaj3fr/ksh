import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@sanity/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const TEXT_SCHEMA = z.object({
  jobId: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  coverLetter: z.string().min(10),
});

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

// ⬇︎ وسّعنا القبول + fallback بالامتداد
const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/x-pdf',
  'application/acrobat',
  'applications/vnd.pdf',
  'text/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // أحيانًا يجي هكذا من بعض المتصفحات/الأنظمة
  'application/octet-stream',
]);

const EXT_WHITELIST = new Set(['.pdf', '.doc', '.docx']);

function extFromName(name?: string | null) {
  if (!name) return '';
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot).toLowerCase() : '';
}

async function uploadFileToSanity(file: File | null) {
  if (!file) return null;
  if (file.size > MAX_FILE_BYTES) throw new Error('FILE_TOO_LARGE');

  const contentType = file.type || 'application/octet-stream';
  const filename = (file as any).name || 'upload';

  // قبول بالـMIME أو بالامتداد كـ fallback
  const ext = extFromName(filename);
  const mimeOk = ALLOWED_MIME.has(contentType);
  const extOk = EXT_WHITELIST.has(ext);

  if (!mimeOk && !extOk) {
    // لو احتجنا ديبَج مؤقت:
    console.warn('Rejected upload', { contentType, filename, size: file.size });
    throw new Error('UNSUPPORTED_TYPE');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const asset = await sanity.assets.upload('file', buffer, {
    filename,
    contentType, // لو كان octet-stream ما عندنا مشكلة طالما الامتداد صحيح
  });
  return asset;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const parsed = TEXT_SCHEMA.parse({
      jobId: String(form.get('jobId') || ''),
      fullName: String(form.get('fullName') || ''),
      email: String(form.get('email') || ''),
      phone: form.get('phone') ? String(form.get('phone')) : undefined,
      coverLetter: String(form.get('coverLetter') || ''),
    });

    const cv = form.get('cv') as File | null;
    const coverLetterFile = (form.get('coverLetterFile') as File) || null;
    const attachments = (form.getAll('attachments') as File[]).filter(Boolean);

    const cvAsset = await uploadFileToSanity(cv);
    if (!cvAsset) return NextResponse.json({ error: 'CV_REQUIRED' }, { status: 400 });

    const clAsset = coverLetterFile ? await uploadFileToSanity(coverLetterFile) : null;

    const attAssets = [];
    for (const f of attachments) {
      if (f && (f as any).size > 0) {
        attAssets.push(await uploadFileToSanity(f));
      }
    }

    const doc = await sanity.create({
      _type: 'jobApplication',
      job: { _type: 'reference', _ref: parsed.jobId },
      fullName: parsed.fullName,
      email: parsed.email,
      phone: parsed.phone || '',
      coverLetter: parsed.coverLetter,
      cvFile: { _type: 'file', asset: { _type: 'reference', _ref: cvAsset._id } },
      ...(clAsset ? { coverLetterFile: { _type: 'file', asset: { _type: 'reference', _ref: clAsset._id } } } : {}),
      ...(attAssets.length
        ? { attachments: attAssets.map(a => ({ _type: 'file', asset: { _type: 'reference', _ref: a!._id } })) }
        : {}),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err: any) {
    const msg = err?.message || 'UNKNOWN_ERROR';
    // رجّع كود مناسب للمستخدم بدل 500 دائمًا
    const status = msg === 'UNSUPPORTED_TYPE' || msg === 'FILE_TOO_LARGE' ? 400 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}

'use client';
import { useState } from 'react';

// تعريف نوع للأخطاء
type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  coverLetter?: string;
  cv?: string;
  general?: string; // للأخطاء العامة
};

type Props = { 
  jobId: string;
  className?: string;
};

export default function JobApplicationForm({ jobId, className = '' }: Props) {
  const [status, setStatus] = useState<'idle'|'submitting'|'ok'|'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({}); // <--- تعديل: حالة لتخزين أخطاء كل حقل

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({}); // <--- تعديل: إعادة تعيين الأخطاء عند كل إرسال

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    fd.set('jobId', jobId);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API_URL}/api/forms/apply`, { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.details) {
          // <--- تعديل: معالجة أخطاء التحقق من الصحة
          const newErrors: FormErrors = {};
          data.details.forEach((error: any) => {
            // تحويل اسم الحقل من "Full Name" إلى "fullName"
            const fieldName = error.field.charAt(0).toLowerCase() + error.field.slice(1).replace(/\s+/g, '');
            newErrors[fieldName as keyof FormErrors] = error.message;
          });
          setErrors(newErrors);
        } else {
          // للأخطاء العامة الأخرى
          setErrors({ general: data.error || 'Submit failed' });
        }
        setStatus('error');
      } else {
        formEl.reset();
        setStatus('ok');
      }
    } catch (err: any) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
      setStatus('error');
    }
  }

  return (
    <form 
      onSubmit={onSubmit} 
      encType="multipart/form-data"
      className={`
        flex flex-col items-start gap-6
        py-6 px-8 rounded-lg border border-[#B49D5A] bg-white
        w-full shadow-lg
        ${className}
      `}
    >
      {/* Honeypot Field (for spam protection) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this out if you are human:</label>
        <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Full Name and Email */}
      <div className="w-full grid gap-6 md:grid-cols-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
            Full name
          </label>
            <input 
            name="fullName" 
            required 
            className={`
              w-full px-4 py-3 rounded-lg border-2 bg-white
              text-[#0c0b0b] placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              transition-all duration-200
              ${errors.fullName ? 'border-red-500' : 'border-[#B49D5A]'}`}
            placeholder="e.g., John Doe"
            />
          {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
            Email
          </label>
          <input 
            name="email" 
            type="email" 
            required 
            className={`
              w-full px-4 py-3 rounded-lg border-2 bg-white
              text-[#0c0b0b] placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              transition-all duration-200
              ${errors.email ? 'border-red-500' : 'border-[#B49D5A]'}`}
            placeholder="example@domain.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div className="w-full">
        <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
          Phone (optional)
        </label>
        <input 
          name="phone" 
          type="tel"
          className={`
            w-full px-4 py-3 rounded-lg border-2 bg-white
            text-[#0c0b0b] placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
            transition-all duration-200
            ${errors.phone ? 'border-red-500' : 'border-[#B49D5A]'}`}
          placeholder="e.g.: +966501234567"
        />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Cover Letter */}
      <div className="w-full">
        <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
          Cover letter
        </label>
        <textarea 
          name="coverLetter" 
          rows={6} 
          required 
          minLength={50}
          className={`
            w-full px-4 py-3 rounded-lg border-2 bg-white
            text-[#0c0b0b] placeholder-gray-500 min-h-[120px]
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
            resize-y transition-all duration-200
            ${errors.coverLetter ? 'border-red-500' : 'border-[#B49D5A]'}`}
          placeholder="Write your cover letter here, minimum 50 characters"
        />
        {errors.coverLetter && <p className="text-red-600 text-sm mt-1">{errors.coverLetter}</p>}
      </div>

      {/* Files */}
      <div className="w-full grid gap-6 md:grid-cols-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
            Resume / CV
          </label>
          <input 
            name="cv" 
            type="file" 
            accept=".pdf,.doc,.docx" 
            required 
            className={`
              w-full px-4 py-3 rounded-lg border-2 bg-white
              text-[#0c0b0b] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              transition-all duration-200
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-[#B49D5A] file:text-white
              hover:file:bg-[#A08948]
              ${errors.cv ? 'border-red-500' : 'border-[#B49D5A]'}`}
          />
          {errors.cv && <p className="text-red-600 text-sm mt-1">{errors.cv}</p>}
        </div>
        {/* ... (يمكنك إضافة نفس المنطق لحقل Cover Letter File) */}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="...">
        {status === 'submitting' ? 'Submitting…' : 'Apply Now'}
      </button>

      {/* Status Messages */}
      {status === 'ok' && (
        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">
            ✅ Your application has been successfully submitted! We will review your application and get back to you soon.
            </p>
        </div>
      )}
      
      {errors.general && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">
            ❌ {errors.general}
          </p>
        </div>
      )}
    </form>
  );
}

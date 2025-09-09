'use client';
import { useState } from 'react';

type Props = { 
  jobId: string;
  className?: string;
};

export default function JobApplicationForm({ jobId, className = '' }: Props) {
  const [status, setStatus] = useState<'idle'|'submitting'|'ok'|'error'>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    fd.set('jobId', jobId);

    try {
      const res = await fetch('/api/forms/apply', { method: 'POST', body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Submit failed');
      }
      formEl.reset();
      setStatus('ok');
    } catch (err: any) {
      setError(err?.message || 'Failed');
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
      {/* Full Name and Email */}
      <div className="w-full grid gap-6 md:grid-cols-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
            Full name
          </label>
          <input 
            name="fullName" 
            required 
            className="
              w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A] bg-white
              text-[#0c0b0b] placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              focus:border-[#B49D5A] transition-all duration-200
            " 
            placeholder="Enter your full name"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
            Email
          </label>
          <input 
            name="email" 
            type="email" 
            required 
            className="
              w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A] bg-white
              text-[#0c0b0b] placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              focus:border-[#B49D5A] transition-all duration-200
            " 
            placeholder="Enter your email"
          />
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
          className="
            w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A] bg-white
            text-[#0c0b0b] placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
            focus:border-[#B49D5A] transition-all duration-200
          " 
          placeholder="Enter your phone number"
        />
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
          className="
            w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A] bg-white
            text-[#0c0b0b] placeholder-gray-500 min-h-[120px]
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
            focus:border-[#B49D5A] transition-all duration-200 resize-y
          " 
          placeholder="Tell us why you're interested in this position..."
        />
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
            className="
              w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A] bg-white
              text-[#0c0b0b] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              focus:border-[#B49D5A] transition-all duration-200
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-[#B49D5A] file:text-white
              hover:file:bg-[#A08948]
            " 
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-[#0c0b0b] mb-2">
            Cover Letter File (optional)
          </label>
          <input 
            name="coverLetterFile" 
            type="file" 
            accept=".pdf,.doc,.docx" 
            className="
              w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A] bg-white
              text-[#0c0b0b] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
              focus:border-[#B49D5A] transition-all duration-200
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-[#B49D5A] file:text-white
              hover:file:bg-[#A08948]
            " 
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="
          w-full bg-[#B49D5A] text-white font-semibold py-3 px-6 rounded-lg
          hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50
          transition-all duration-200 shadow-md hover:shadow-lg
          active:transform active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {status === 'submitting' ? 'Submitting…' : 'Apply Now'}
      </button>

      {/* Status Messages */}
      {status === 'ok' && (
        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-medium">
            ✅ Application submitted successfully! We'll get back to you soon.
          </p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">
            ❌ {error}
          </p>
        </div>
      )}
    </form>
  );
}

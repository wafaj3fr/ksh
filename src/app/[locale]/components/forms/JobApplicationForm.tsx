"use client";
import { useState } from "react";

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  coverLetter?: string;
  cv?: string;
  general?: string;
};

type Props = {
  jobId: string;
  className?: string;
};

export default function JobApplicationForm({ jobId, className = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setUploadProgress(0);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    fd.set("jobId", jobId);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_EXPRESS_API_URL}/api/forms/apply`
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          formEl.reset();
          setStatus("ok");
          setUploadProgress(0);
        } else {
          if (xhr.status === 400 && data.details) {
            const newErrors: FormErrors = {};
            data.details.forEach((error: any) => {
              newErrors[error.field as keyof FormErrors] = error.message;
            });
            setErrors(newErrors);
          } else {
            setErrors({
              general: data.message || "Submission failed. Please try again.",
            });
          }
          setStatus("error");
        }
      };

      xhr.onerror = () => {
        setErrors({ general: "Network error. Please check your connection." });
        setStatus("error");
      };

      xhr.send(fd);
    } catch (err: any) {
      console.error("❌ Job form error:", err);
      setErrors({
        general: "Unexpected error occurred. Please try again later.",
      });
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className={`
        flex flex-col items-start gap-6
        py-6 px-8 rounded-lg border border-[#B49D5A]/60 bg-white
        w-full shadow-lg transition-all
        ${className}
      `}
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Full Name + Email */}
      <div className="w-full grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            name="fullName"
            required
            className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
              ${errors.fullName ? "border-red-500" : "border-[#B49D5A]/70"}`}
            placeholder="e.g. John Doe"
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
              ${errors.email ? "border-red-500" : "border-[#B49D5A]/70"}`}
            placeholder="example@domain.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Phone
        </label>
        <input
          name="phone"
          type="tel"
          required
          className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
            ${errors.phone ? "border-red-500" : "border-[#B49D5A]/70"}`}
          placeholder="e.g. +966501234567"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Cover Letter */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cover Letter
        </label>
        <textarea
          name="coverLetter"
          required
          rows={6}
          minLength={50}
          className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all resize-y
            ${errors.coverLetter ? "border-red-500" : "border-[#B49D5A]/70"}`}
          placeholder="Tell us about yourself and why you’re a great fit (min 50 characters)"
        />
        {errors.coverLetter && (
          <p className="text-red-600 text-sm mt-1">{errors.coverLetter}</p>
        )}
      </div>

      {/* CV Upload */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Resume / CV
        </label>
        <input
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
            file:me-4 file:py-2 file:px-4 file:rounded-full file:border-0
            file:text-sm file:font-semibold file:bg-[#B49D5A] file:text-white hover:file:bg-[#A08948]
            ${errors.cv ? "border-red-500" : "border-[#B49D5A]/70"}`}
        />
        {errors.cv && <p className="text-red-600 text-sm mt-1">{errors.cv}</p>}
      </div>

      {/* Progress Bar */}
      {status === "submitting" && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
          <div
            className="bg-[#B49D5A] h-2 transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full bg-[#B49D5A] text-white font-semibold py-3 px-6 rounded-lg 
          hover:bg-[#937c41] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50 
          transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === "submitting"
          ? `Uploading… ${uploadProgress > 0 ? `${uploadProgress}%` : ""}`
          : "Apply Now"}
      </button>

      {/* Status Messages */}
      {status === "ok" && (
        <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-700 text-sm font-medium">
            ✅ Application submitted successfully! We’ll review and contact you
            soon.
          </p>
        </div>
      )}
      {errors.general && (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-600 text-sm font-medium">
            ❌ {errors.general}
          </p>
        </div>
      )}
    </form>
  );
}

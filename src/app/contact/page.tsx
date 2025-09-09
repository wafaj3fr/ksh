'use client';
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("submitting");
  setError("");

  const formEl = e.currentTarget; // ✅ خزن المرجع هنا
  const fd = new FormData(formEl);

  try {
    const res = await fetch("/api/forms/contact", { method: "POST", body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || "Submit failed");
    }

    formEl.reset(); // ✅ استعمل المرجع المحفوظ
    setStatus("ok");
  } catch (err: any) {
    setError(err.message || "Failed");
    setStatus("error");
  }
}


  return (
    <section className="bg-[#0F1626] py-16 px-6">
      <div className="max-w-xl mx-auto">
        {/* Card Container */}
        <div className="bg-white border border-[#B49D5A]/40 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Get in Touch
          </h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="fullName"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A]/70 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 focus:border-[#B49D5A] transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A]/70 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 focus:border-[#B49D5A] transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                name="subject"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A]/70 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 focus:border-[#B49D5A] transition-all"
                placeholder="Enter subject"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#B49D5A]/70 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 focus:border-[#B49D5A] transition-all resize-y"
                placeholder="Write your message..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#B49D5A] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#937c41] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50 transition-all shadow-md hover:shadow-lg"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>

            {/* Status Messages */}
            {status === "ok" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-700 text-sm font-medium">
                  ✅ Message sent successfully!
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-600 text-sm font-medium">❌ {error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";

type FormErrors = {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<FormErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const formData = Object.fromEntries(fd.entries());
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_URL}/api/forms/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.details) {
          const newErrors: FormErrors = {};
          data.details.forEach((err: any) => {
            newErrors[err.field as keyof FormErrors] = err.message;
          });
          setErrors(newErrors);
        } else {
          setErrors({
            general: data.message || "Submission failed. Please try again.",
          });
        }
        setStatus("error");
      } else {
        formEl.reset();
        setStatus("ok");
      }
    } catch (err: any) {
      console.error("❌ Frontend error:", err);
      setErrors({
        general: "An unexpected error occurred. Please try again later.",
      });
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#0F1626] py-16 px-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-[#B49D5A]/40 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Get in Touch
          </h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {/* Honeypot (Anti-bot) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="honeypot">
                Do not fill this out if you are human:
              </label>
              <input
                type="text"
                id="honeypot"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="fullName"
                required
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
                  ${errors.fullName ? "border-red-500" : "border-[#B49D5A]/70"}`}
                placeholder="Example: John Doe"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
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
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
                  ${errors.email ? "border-red-500" : "border-[#B49D5A]/70"}`}
                placeholder="example@domain.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                name="subject"
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all
                  ${errors.subject ? "border-red-500" : "border-[#B49D5A]/70"}`}
                placeholder="Example: Inquiry about company services"
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
              )}
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
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/40 transition-all resize-y
                  ${errors.message ? "border-red-500" : "border-[#B49D5A]/70"}`}
                placeholder="Write your message here, minimum 10 characters"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#B49D5A] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#937c41] focus:outline-none focus:ring-2 focus:ring-[#B49D5A]/50 transition-all shadow-md hover:shadow-lg"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>

            {/* Messages */}
            {status === "ok" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-700 text-sm font-medium">
                  ✅ Message sent successfully! We’ll get back to you shortly.
                </p>
              </div>
            )}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-600 text-sm font-medium">
                  ❌ {errors.general}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

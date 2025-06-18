import Header from "../components/Header";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      <Header />
      <section className="px-6 sm:px-20 pt-32 pb-20 bg-[#e7ebf0]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary mb-4 text-center">Contact Us</h1>
          <div className="w-24 h-1 bg-[#B49C5B] rounded mb-10 mx-auto" />
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-12">
            We’d love to hear from you. Reach out for partnership opportunities, investment inquiries, or general questions.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#B49C5B] flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row gap-8 justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#B49C5B]" />
                <span className="text-gray-800 font-medium">info@kshc.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-[#B49C5B]" />
                <span className="text-gray-800 font-medium">+249 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#B49C5B]" />
                <span className="text-gray-800 font-medium">Khartoum, Sudan</span>
              </div>
            </div>
            <form className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B49C5B] transition"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B49C5B] transition"
                  placeholder="you@email.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-semibold text-gray-700">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B49C5B] transition"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="bg-[#B49C5B] text-white font-bold py-3 rounded-lg hover:bg-[#a88a46] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
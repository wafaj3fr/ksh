'use client';
import React, { useState } from 'react';
import { Menu, X, Users, User, Briefcase, Award } from "lucide-react";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="bg-gradient-to-br from-[#f8fbff] via-white to-[#f2f6fc] text-gray-800 font-sans min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 sm:px-20 py-6 bg-white/50 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
        <a href="/">
          <div className="text-2xl font-extrabold tracking-tight text-primary">KSHC</div>
        </a>
        <nav className="hidden sm:flex gap-8 text-sm font-medium">
          {["about", "subsidiaries", "news", "contact"].map((link) => (
            <a key={link} href={`/${link}`} className="text-gray-700 hover:text-primary transition-all duration-200">
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-gray-800">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {isOpen && (
          <div className="absolute top-20 right-8 bg-white/90 backdrop-blur-lg shadow-xl p-6 rounded-xl flex flex-col gap-4 sm:hidden border border-white/40">
            {["about", "subsidiaries", "news", "contact"].map((link) => (
              <a key={link} href={`/${link}`} className="text-gray-700 hover:text-primary transition">
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative text-center py-32">
        <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center opacity-10" />
        <h1 className="relative z-10 text-5xl sm:text-6xl font-extrabold text-primary tracking-tight drop-shadow-lg">
          About Us
        </h1>
      </section>

      {/* History */}
      <section className="max-w-4xl mx-auto px-6 sm:px-0 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Award className="text-primary" size={32} />
          <h2 className="text-3xl font-bold">Our History</h2>
        </div>
        <p className="text-lg leading-relaxed bg-white/80 rounded-xl shadow p-6">
          Founded in 2005, KSHC has grown from a visionary investment group into a leading force in Sudan’s economic development. We have launched major infrastructure projects, expanded into new sectors, and built strategic partnerships regionally and globally.
        </p>
      </section>

      {/* Vision, Mission, Values */}
      <section className="max-w-6xl mx-auto px-6 sm:px-0 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-primary" size={32} />
          <h2 className="text-3xl font-bold">Vision, Mission & Values</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: "Vision", content: "To be the leading investment group driving sustainable growth and innovation in Sudan and beyond." },
            { title: "Mission", content: "Empowering communities and industries through strategic investments, partnerships, and a commitment to excellence." },
            { title: "Values", content: ["Integrity & Transparency", "Innovation", "Community Impact", "Long-term Vision"] },
          ].map(({ title, content }, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 text-center">
              <h3 className="font-bold text-xl mb-2 text-primary">{title}</h3>
              {Array.isArray(content) ? (
                <ul className="list-disc list-inside text-left text-gray-700 space-y-1 mt-2">
                  {content.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-gray-700">{content}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="max-w-4xl mx-auto px-6 sm:px-0 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-primary" size={32} />
          <h2 className="text-3xl font-bold">Organizational Structure</h2>
        </div>
        <div className="bg-white/90 rounded-xl shadow p-6 text-center">
          <p className="mb-6">
            KSHC operates as a holding company governed by a board of directors. We manage multiple subsidiaries, each strategically aligned to ensure accountability, flexibility, and sustainable performance.
          </p>
          <div className="flex flex-col items-center">
            <div className="text-primary font-bold text-lg">Board of Directors</div>
            <div className="w-1 h-8 bg-primary/30"></div>
            <div className="font-semibold text-gray-700">Executive Management</div>
            <div className="w-1 h-8 bg-primary/30"></div>
            <div className="flex gap-4 flex-wrap justify-center mt-2">
              {["Subsidiary A", "Subsidiary B", "Subsidiary C"].map((label, idx) => (
                <span key={idx} className="bg-primary/10 px-4 py-2 rounded-full font-medium text-sm">{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="max-w-4xl mx-auto px-6 sm:px-0 py-16">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-primary" size={32} />
          <h2 className="text-3xl font-bold">CEO's Message</h2>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <blockquote className="italic text-lg text-gray-700 border-l-4 border-primary pl-4">
            "At KSHC, we believe in the power of vision, partnership, and innovation. Our journey is defined by a relentless pursuit of excellence and a deep commitment to Sudan’s future. Thank you for trusting us to build a brighter tomorrow."
          </blockquote>
          <p className="mt-6 text-right text-primary font-semibold">— Mahmoud Alassad, CEO</p>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="max-w-6xl mx-auto px-6 sm:px-0 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-primary" size={32} />
          <h2 className="text-3xl font-bold">Board of Directors</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { name: "Maj. Gen. Pilot Al-Fateh Mohamed Ahmed Aroua", role: "Chairman", image: "/avatar4.png" },
            { name: "Hisham Mustafa Allam", role: "Board Member", image: "/avatar2.png" },
            { name: "Osama Michel Matta", role: "Board Member", image: "/avatar.png" },
          ].map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all">
              <img
                src={member.image}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
              />
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

'use client';
import React, { useState } from 'react';
import { Menu, X, Newspaper, CalendarDays, Link2 } from "lucide-react";

export default function News() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="px-8 sm:px-20 py-16 bg-gradient-to-br from-[#f7faff] via-white to-[#f4f8ff] min-h-screen text-gray-800">
      <header className="flex justify-between items-center px-8 sm:px-20 py-6 bg-white/30 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
        <a href="/"><div className="text-2xl font-bold text-primary">KSHC</div></a>
        <nav className="hidden sm:flex gap-8 text-md font-medium">
          <a href="/about" className="text-gray-700 hover:text-primary hover:underline transition">About</a>
          <a href="/subsidiaries" className="text-gray-700 hover:text-primary hover:underline transition">Subsidiaries</a>
          <a href="/news" className="text-gray-700 hover:text-primary hover:underline transition">News</a>
          <a href="/contact" className="text-gray-700 hover:text-primary hover:underline transition">Contact</a>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-gray-800">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {isOpen && (
          <div className="absolute top-20 right-8 bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-xl flex flex-col gap-4 sm:hidden border border-white/30">
            <a href="/about" className="text-gray-700 hover:text-primary transition">About</a>
            <a href="/subsidiaries" className="text-gray-700 hover:text-primary transition">Subsidiaries</a>
            <a href="/news" className="text-gray-700 hover:text-primary transition">News</a>
            <a href="/contact" className="text-gray-700 hover:text-primary transition">Contact</a>
          </div>
        )}
      </header>

      <h1 className="text-4xl font-bold mb-8 text-primary text-center">News & Media</h1>

      {/* Press Releases */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
          <Newspaper className="text-primary" size={28} /> Press Releases
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">KSHC Launches Green Energy Initiative</h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2"><CalendarDays size={16} /> May 2025</p>
            <p className="text-gray-700 text-sm mb-3">KSHC announces a major investment in renewable energy projects across Sudan, aiming to boost sustainable development.</p>
            <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline"><Link2 size={16} /> Read More</a>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Strategic Partnership with Tech Innovators</h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2"><CalendarDays size={16} /> April 2025</p>
            <p className="text-gray-700 text-sm mb-3">A new partnership with leading technology firms will accelerate digital transformation in Sudan’s infrastructure sector.</p>
            <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline"><Link2 size={16} /> Read More</a>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
          <Newspaper className="text-primary" size={28} /> Media Coverage
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">KSHC Featured in Global Business Times</h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2"><CalendarDays size={16} /> March 2025</p>
            <p className="text-gray-700 text-sm mb-3">An in-depth article highlights KSHC’s role in driving economic growth and innovation in Sudan.</p>
            <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline"><Link2 size={16} /> View Article</a>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Interview: CEO on Investment Vision</h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2"><CalendarDays size={16} /> February 2025</p>
            <p className="text-gray-700 text-sm mb-3">KSHC’s CEO discusses the company’s long-term vision and commitment to sustainable investments.</p>
            <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline"><Link2 size={16} /> Watch Interview</a>
          </div>
        </div>
      </section>

      {/* Events & Conferences */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
          <CalendarDays className="text-primary" size={28} /> Events & Conferences
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Sudan Investment Forum 2025</h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2"><CalendarDays size={16} /> June 2025</p>
            <p className="text-gray-700 text-sm mb-3">KSHC will participate in the Sudan Investment Forum, presenting new opportunities and projects to global investors.</p>
            <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline"><Link2 size={16} /> Event Details</a>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Annual CSR Conference</h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2"><CalendarDays size={16} /> August 2025</p>
            <p className="text-gray-700 text-sm mb-3">Highlighting KSHC’s commitment to social responsibility and sustainable business practices.</p>
            <a href="#" className="text-primary font-medium flex items-center gap-1 hover:underline"><Link2 size={16} /> Learn More</a>
          </div>
        </div>
      </section>
    </main>
  );
}
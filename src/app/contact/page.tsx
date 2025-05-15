'use client';
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
export default function Contact() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="px-8 sm:px-20 py-16 bg-white text-gray-800">
        {/* Header */}
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
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      {/* Contact Form, Location Map, Investor Relations Contact */}
    </main>
  );
}
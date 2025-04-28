'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen text-gray-900 font-sans">

      {/* Header */}
      <header className="flex justify-between items-center px-8 sm:px-20 py-6 bg-gradient-to-b from-[#d1e9ff] via-[#e0f2fe] to-[#f0f9ff] shadow-sm">
      <div className="text-2xl font-bold text-gray-900">KSHC</div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex gap-8 text-md font-medium">
        <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
        <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
        <a href="#vision" className="text-gray-700 hover:text-primary transition">Vision</a>
        <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
      </nav>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-gray-800">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-20 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col gap-4 sm:hidden">
          <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
          <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
          <a href="#vision" className="text-gray-700 hover:text-primary transition">Vision</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
        </div>
      )}
    </header>

      {/* Hero Section */}
      <section
  id="home"
  className="flex flex-col items-center text-center gap-6 px-8 sm:px-20 py-20 bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe] to-[#d1e9ff]"
>
  <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
    Kuwaiti Sudanese Holding Company
  </h1>
  <p className="text-xl text-gray-600 max-w-2xl">
    Building tomorrow's technology ecosystem through strategic investments and innovative solutions.
  </p>
  <div className="flex gap-4 mt-6 flex-wrap justify-center">
    <a
      href="#services"
      className="bg-gradient-to-r from-[#93c5fd] to-[#60a5fa] text-white px-8 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition"
    >
      Discover More
    </a>
    <a
      href="#contact"
      className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition flex items-center gap-2"
    >
      Contact Us →
    </a>
  </div>
  
</section>

      {/* About Section */}
      <section id="about" className="px-8 sm:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">About the Holding Company</h2>
        <p className="text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto text-center">
          Kuwaiti Sudanese Holding Company (KSHC) is a leader in driving technological innovation and ICT solutions across Sudan and beyond. 
          Our mission is to empower businesses and communities through cutting-edge technology and strategic investments.
        </p>
      </section>

      {/* Subsidiaries Section */}
      <section id="subsidiaries" className="px-8 sm:px-20 py-20 bg-[#f7f9fc]">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Subsidiaries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { name: "QAST", link: "/qast", image: "cyber.png", desc: "Empowering digital transformation through a collective of experts in ICT, cloud systems, and AI innovation." },
            { name: "TAD", link: "/tad", image: "fac1.png", desc: "Excellence in Facilities Management, ensuring smarter, safer, and more sustainable environments." },
            { name: "X", link: "/x", image: "cpu.png" },
          ].map((subsidiary) => (
            <Link
              key={subsidiary.name}
              href={subsidiary.link}
              target="_blank"
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all"
            >
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={`/${subsidiary.image}`}
                  alt={subsidiary.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{subsidiary.name}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {subsidiary.desc || "Leading the way in technology and innovation."}
                </p>
                <span className="text-blue-900 font-semibold hover:underline">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 sm:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Focus Areas / Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {[
            { name: "Cloud Computing", image: "/nasa-Q1p7bh3SHj8-unsplash.jpg" },
            { name: "Cybersecurity", image: "/idk.png" },
            { name: "AI Solutions", image: "/idke.png" },
            { name: "IoT", image: "/cristiano-firmani-tmTidmpILWw-unsplash.jpg" },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-sm text-white flex flex-col justify-end bg-cover bg-center h-64"
              style={{
                backgroundImage: `url(${service.image})`,
              }}
            >
              <h3 className="text-xl font-bold">{service.name}</h3>
              <p className="text-sm">
                Delivering cutting-edge solutions to meet modern challenges.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="px-8 sm:px-20 py-20 bg-[#eef2f7]">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          We collaborate with leading global and regional partners to deliver exceptional value.
        </p>
        <div className="bg-white w-full h-32 rounded-xl shadow-md flex items-center justify-center">
          <span className="text-gray-400 text-lg">Partner Logos Placeholder</span>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-center py-8 bg-white border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2025 Kuwaiti Sudanese Holding Company (KSHC). All rights reserved.
        </p>
      </footer>

    </div>
  );
}

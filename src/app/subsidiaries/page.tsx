'use client';
import React, { useState } from 'react';
import { Menu, X, Wifi, Building, Truck, Hammer } from "lucide-react";

const subsidiaries = [
  {
    name: "Qast",
    sector: "Technology",
    desc: "ICT & Network Services",
    image: "/cpu.png",
    link: "https://qasthub.com/"
  },
  {
    name: "Cubes",
    sector: "Real Estate",
    desc: "Construction & Real Estate",
    image: "/fac1.png"
  },
  {
    name: "TAD",
    sector: "Facility Management",
    desc: "Facility Management Solutions",
    image: "/fac2.png"
  },
  {
    name: "Quality",
    sector: "Supply Chain",
    desc: "Supply Chain Services",
    image: "/fac3.png"
  }
];

const sectorIcons: Record<string, React.ReactNode> = {
  Technology: <Wifi className="text-primary" size={32} />,
  "Real Estate": <Building className="text-primary" size={32} />,
  "Facility Management": <Hammer className="text-primary" size={32} />,
  "Supply Chain": <Truck className="text-primary" size={32} />
};

export default function Subsidiaries() {
  const [isOpen, setIsOpen] = useState(false);

  // Group subsidiaries by sector
  const grouped = subsidiaries.reduce((acc, sub) => {
    acc[sub.sector] = acc[sub.sector] || [];
    acc[sub.sector].push(sub);
    return acc;
  }, {} as Record<string, typeof subsidiaries>);

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
      <h1 className="text-4xl font-bold mb-12 text-primary text-center">Our Subsidiaries</h1>
      <div className="space-y-16">
        {Object.entries(grouped).map(([sector, subs]) => (
          <section key={sector}>
            <div className="flex items-center gap-3 mb-6">
              {sectorIcons[sector] || null}
              <h2 className="text-2xl font-semibold">{sector}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subs.map((sub, idx) => (
                <a
                  key={idx}
                  href={sub.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all"
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    width={100}
                    height={80}
                    className="rounded-lg mb-4 object-contain border-2 border-primary/10"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{sub.name}</h3>
                  <p className="text-primary font-medium mb-1">{sub.desc}</p>
                  <span className="text-xs text-gray-500">{sector}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
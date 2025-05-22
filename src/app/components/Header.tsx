"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  logo?: { asset: { url: string }; alt?: string };
}

export default function Header({ logo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-8 sm:px-20 py-2 bg-white/70 shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-primary">
        {logo ? (
          <Image src={logo.asset.url} alt={logo.alt || "KSHC Logo"} width={150} height={50} />
        ) : (
          "KSHC"
        )}
      </div>

      <nav className="hidden sm:flex gap-8 text-md font-medium">
        <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
        <a href="#sectors" className="text-gray-700 hover:text-primary transition">Sectors</a>
        <a href="#subsidiaries" className="text-gray-700 hover:text-primary transition">Subsidiaries</a>
        <a href="#news" className="text-gray-700 hover:text-primary transition">News</a>
        <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
      </nav>

      <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-gray-800">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-20 right-8 bg-white shadow-lg p-6 rounded-xl flex flex-col gap-4 sm:hidden">
          <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
          <a href="#sectors" className="text-gray-700 hover:text-primary transition">Sectors</a>
          <a href="#subsidiaries" className="text-gray-700 hover:text-primary transition">Subsidiaries</a>
          <a href="#news" className="text-gray-700 hover:text-primary transition">News</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
        </div>
      )}
    </header>
  );
}

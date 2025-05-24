"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  logo?: { asset: { url: string }; alt?: string };
}

export default function Header({ logo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navText = isScrolled ? "text-gray-800" : "text-white";
  const hoverText = isScrolled ? "hover:text-[#B49C5B]" : "hover:text-[#fcd34d]"; // light gold on dark

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 sm:px-20 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          {logo ? (
            <Image
              src={logo.asset.url}
              alt={logo.alt || "KSHC Logo"}
              width={140}
              height={50}
              className="object-contain"
            />
          ) : (
            <span className={`text-xl font-bold tracking-tight ${navText}`}>KSHC</span>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
          {["About", "Sectors", "Subsidiaries", "News", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`${navText} ${hoverText} transition duration-200 relative group`}
            >
              {item}
              <span
                className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-[#B49C5B] transition-all group-hover:w-full`}
              />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${navText} sm:hidden`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-6 pt-2 pb-4">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-200 animate-fadeIn">
            {["About", "Sectors", "Subsidiaries", "News", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 font-medium hover:text-[#B49C5B] transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

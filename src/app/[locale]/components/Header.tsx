"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  logo?: {
    asset: { url: string };
    alt?: string;
  };
}

const navItems = [
  { name: "About", href: "/about" },
  { name: "Subsidiaries", href: "/subsidiaries" },
  { name: "News", href: "/news" },
  { name: "Services", href: "/services" },
  { name: "Careers", href: "/careers" },
];

export default function Header({ logo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navText = isScrolled ? "text-gray-100" : "text-white";
  const hoverText = "hover:text-[#B49C5B]";
  const bgColor = isScrolled
    ? "bg-gray-900 border-b border-gray-700"
    : "bg-transparent border-b border-[#B49C5B]";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgColor} ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-6 sm:px-16 py-2 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {logo?.asset?.url ? (
            <Image
              src={logo.asset.url}
              alt={logo.alt || "KSHC Logo"}
              width={100} // smaller logo
              height={40}
              className="object-contain"
              priority
            />
          ) : (
            <span className={`text-lg font-bold tracking-tight ${navText}`}>
              KSHC
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-medium">
          {navItems.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`relative group transition duration-200 ${
                  isActive ? "text-[#B49C5B]" : navText
                } ${hoverText}`}
              >
                {name}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-[#B49C5B] transition-transform duration-200 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            );
          })}

          {/* CTA Contact Button */}
          <Link
            href="/contact"
            className="ml-4 bg-[#B49C5B] text-black font-semibold text-xs px-4 py-1.5 rounded-full hover:bg-[#a4884a] transition"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${navText} sm:hidden`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="sm:hidden px-6 pt-2 pb-4">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-gray-200 text-sm">
            {[...navItems, { name: "Contact", href: "/contact" }].map(
              ({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium text-gray-800 hover:text-[#B49C5B] transition ${
                    pathname === href ? "text-[#B49C5B]" : ""
                  }`}
                >
                  {name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}

'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Target, Globe, Users, TrendingUp, Layers } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-900 font-sans bg-[#f5f7fa]">
      {/* Header */}
      <header className="flex justify-between items-center px-8 sm:px-20 py-6 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-primary">KSHC</div>

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
          <div className="absolute top-20 right-8 bg-white shadow-lg p-6 rounded-xl flex flex-col gap-4 sm:hidden">
            <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
            <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
            <a href="#vision" className="text-gray-700 hover:text-primary transition">Vision</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="text-center px-8 sm:px-20 py-24 bg-[url('/image.png')] bg-cover bg-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-primary leading-tight text-white">
          We Aspire to Excellence<br />Through Integration
        </h1>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto">
          A Leading Investment Group Driven by Innovation and Vision
        </p>
      </section>

      {/* About Section */}
<section id="about" className="px-8 sm:px-20 py-24 bg-white text-gray-800">
  <div className="max-w-6xl mx-auto text-center space-y-12">
    <h2 className="text-4xl font-bold text-gray-900">The Kuwaiti Sudanese Holding Company</h2>
    <p className="text-lg text-gray-600">KSHC is an innovative investment group advancing economic development in Sudan through strategic and integrated ventures.</p>

    <div className="grid sm:grid-cols-2 gap-8">
      <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
        <div className="flex items-center gap-4 mb-3">
          <Globe className="text-blue-600" size={28} />
          <h3 className="text-xl font-semibold text-blue-800">Our Vision</h3>
        </div>
        <p className="text-gray-700">To establish the largest economic group with foreign capital contributing to Sudan’s growth.</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
        <div className="flex items-center gap-4 mb-3">
          <Target className="text-blue-600" size={28} />
          <h3 className="text-xl font-semibold text-blue-800">Our Mission</h3>
        </div>
        <p className="text-gray-700">Supporting the Sudanese economy internally and bringing global innovations externally.</p>
      </div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {[
        { icon: <Users className="text-blue-600" size={28} />, title: "Kuwait-Sudan Ties", desc: "Strengthening economic relationships between Kuwait and Sudan." },
        { icon: <TrendingUp className="text-blue-600" size={28} />, title: "Reconstruction Focus", desc: "Supporting post-conflict rebuilding efforts in Sudan." },
        { icon: <Layers className="text-blue-600" size={28} />, title: "Smart Investments", desc: "Investing in impactful sectors that drive innovation." },
        { icon: <Users className="text-blue-600" size={28} />, title: "Talent Development", desc: "Nurturing innovation and Sudanese professionals." },
        { icon: <Target className="text-blue-600" size={28} />, title: "Social Responsibility", desc: "Building community connections across generations." },
        { icon: <Globe className="text-blue-600" size={28} />, title: "Smart Partnerships", desc: "Expanding impact through collaboration and strong asset management." },
      ].map((goal, i) => (
        <div key={i} className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
          <div className="flex items-center gap-4 mb-3">
            {goal.icon}
            <h4 className="text-md font-semibold text-blue-800">{goal.title}</h4>
          </div>
          <p className="text-gray-700 text-sm">{goal.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Services Section */}
      <section id="services" className="px-8 sm:px-20 py-20 bg-[#f7f9fc]">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Fields of Operation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary">General Investment</h3>
            <p className="text-gray-600">
              Focus on impactful projects and companies that improve productivity and life quality.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Specialized Investment</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Telecom & tech services</li>
              <li>Real estate & project development</li>
              <li>Supply chain & logistics</li>
              <li>Modern facility management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Subsidiaries Section */}
      <section id="subsidiaries" className="px-8 sm:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">KSHC Subsidiaries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { name: "Qast", desc: "ICT & Network Services", image: "cyber.png", link: "https://qasthub.com/" },
            { name: "Cubes", desc: "Construction & Real Estate", image: "fac1.png" },
            { name: "TAD", desc: "Facility Management Solutions", image: "fac2.png" },
            { name: "Quality", desc: "Supply Chain Services", image: "supply.png" },
          ].map((sub, i) => (
            <Link key={i} href={sub.link || "#"} target="_blank">
              <div className="bg-[#f9fafb] p-6 rounded-xl shadow hover:shadow-md transition-all">
                <Image src={`/${sub.image}`} alt={sub.name} width={400} height={300} className="rounded-lg mb-4 object-cover w-full h-40" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{sub.name}</h3>
                <p className="text-sm text-gray-600">{sub.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="px-8 sm:px-20 py-20 bg-[#f0f9ff]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Building the Foundations of a Better Future</h2>
          <p className="text-gray-700 text-lg">
            KSHC is committed to becoming a major economic group, driving growth, innovation, and impact through integrated ventures, community upliftment, and preparing the region for future challenges.
          </p>
        </div>
      </section>

      {/* Establishment & Board */}
      <section className="px-8 sm:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Establishment & Leadership</h2>
        <p className="text-gray-600 text-center mb-8">Founded under the Sudanese Companies Law.</p>
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-semibold text-primary">Board of Directors</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Major General Pilot Al-Fateh Mohamed Ahmed Aroua – Chairman</li>
            <li>Hisham Mustafa Allam – Member</li>
            <li>Osama Michel Matta – Member</li>
          </ul>
        </div>
      </section>

      {/* CEO Message */}
      <section className="px-8 sm:px-20 py-20 bg-[#f7f9fc]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">CEO's Message</h2>
          <p className="text-lg text-gray-600">
            At KSHC, we pride ourselves on being a Kuwaiti-backed company contributing to Sudan’s economy. We strive for sustainable growth, market-aligned investments, and empowering Sudanese talent. Our values and vision guide us toward making a lasting impact on our country and community.
          </p>
          <p className="mt-6 text-gray-700 font-medium">— Mahmoud Alassad</p>
        </div>
      </section>

      {/* Why Us */}
      <section className="px-8 sm:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Why Choose KSHC?</h2>
        <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto">
          We follow a strategic, credible, and innovative investment methodology to build a sustainable and impactful legacy through comprehensive services and long-term trust with our partners.
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-center py-10 bg-[#f0f9ff] border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2025 Kuwaiti Sudanese Holding Company (KSHC). All rights reserved.
        </p>
      </footer>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu, X,
  Wifi, Building, Truck, Hammer,
  Users, Award, Briefcase, Globe, Target, Layers,
  TrendingUp,
  Eye,
  Mountain
} from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const generalObjectives = [
    { label: "Kuwait–Sudan Ties", icon: <Globe className="w-6 h-6" /> },
    { label: "post-conflict Reconstruction", icon: <Award className="w-6 h-6" /> },
    { label: "Smart Investments", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Talent Development", icon: <Users className="w-6 h-6" /> },
    { label: "Social Responsibility", icon: <Target className="w-6 h-6" /> },
    { label: "Smart Partnerships", icon: <Layers className="w-6 h-6" /> },
  ];

  const sectors = [
    { title: "Telecom & Technology", desc: "Empowering connectivity and innovation through advanced ICT infrastructure.", icon: <Wifi className="text-white w-6 h-6" /> },
    { title: "Real Estate & Development", desc: "Planning and managing sustainable urban and commercial growth.", icon: <Building className="text-white w-6 h-6" /> },
    { title: "Supply Chain & Logistics", desc: "Streamlining procurement, storage, and distribution systems nationwide.", icon: <Truck className="text-white w-6 h-6" /> },
    { title: "Facility Management", desc: "Delivering integrated smart solutions for modern infrastructure.", icon: <Hammer className="text-white w-6 h-6" /> },
  ];

  const subsidiaries = [
    { name: "QAST", desc: "ICT & Network Services", image: "/cpu.png", link: "https://qasthub.com" },
    { name: "CUBES", desc: "Construction & Real Estate", image: "/fac1.png" },
    { name: "TAD", desc: "Facility Management Solutions", image: "/fac2.png" },
  ];

  return (
    <main className="font-sans text-gray-900 bg-[#f9fafc]">
      {/* Header */}
      <header className="flex justify-between items-center px-6 sm:px-20 py-6 bg-[#0a1f44] text-white sticky top-0 z-50">
        <div className="text-xl font-bold">Logo</div>
        <nav className="hidden sm:flex gap-8 text-sm font-medium">
          <a href="#about">About</a>
          <a href="#sectors">Sectors</a>
          <a href="#news">News</a>
          <a href="#contact">Contact us</a>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Hero */}
      <section className="bg-[#0a1f44] text-white text-center px-6 sm:px-20 py-24">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3">We Aspire to Excellence Through Integration</h1>
        <p className="text-sm sm:text-base">A Leading Investment Group Driven by Innovation and Vision</p>
      </section>

      {/* About */}
<section id="about" className="relative bg-[#e7ebf0] px-6 sm:px-20 pt-24 pb-48">
  {/* Split Layout */}
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
    {/* Left - Text Content */}
    <div className="space-y-6">
      <span className="inline-block bg-[#B49C5B] text-[#0a1f44] font-semibold px-4 py-1 rounded shadow-md w-fit">
        About Us
      </span>
      <p className="text-lg text-gray-700 leading-relaxed">
        The Kuwaiti Sudanese Holding Company is an innovative and dynamic investment group that keeps pace with the latest investment developments in Sudan. It is committed to leading in its unique fields, striving for excellence through integrated efforts in all its investments.
      </p>
    </div>

    {/* Right - Illustration */}
    <div className="flex justify-center">
      <Image
        src="/vision-graphic.svg"
        alt="About illustration"
        width={420}
        height={420}
        className="max-w-full h-auto"
      />
    </div>
  </div>

  {/* Vision / Mission / Goal Cards */}
  <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
    <div className="grid sm:grid-cols-3 gap-6 justify-center">
      {[
        {
          title: "Vision",
          desc: "To establish the largest economic group with foreign capital contributing to Sudan’s growth.",
          icon: <Eye className="text-primary w-8 h-8 mx-auto" />
        },
        {
          title: "Mission",
          desc: "Bringing global technologies and business practices to Sudan, aligning the country with global advancements.",
          icon: <Mountain className="text-primary w-8 h-8 mx-auto" />
        },
        {
          title: "Goal",
          desc: "Strengthening Kuwait–Sudan ties, rebuilding post-conflict Sudan, and investing in high-impact sectors.",
          icon: <Target className="text-primary w-8 h-8 mx-auto" />
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-xl p-6 text-center border border-[#B49C5B] flex flex-col items-center"
        >
          <div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
            {item.icon}
          </div>
          <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Objectives */}
      <section id="objectives" className="bg-white pt-48 pb-24 px-6 sm:px-20">
  <h2 className="text-2xl font-bold text-center text-primary mb-10">General Objectives</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
    {[
      {
        label: "Kuwait–Sudan Ties",
        icon: <Globe className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Post-conflict Reconstruction",
        icon: <Award className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Smart Investments",
        icon: <TrendingUp className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Talent Development",
        icon: <Users className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Social Responsibility",
        icon: <Target className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Smart Partnerships",
        icon: <Layers className="text-primary w-7 h-7 mx-auto" />
      },
    ].map((item, idx) => (
      <div key={idx} className="flex flex-col items-center ">
        <div className="bg-primary/10 p-4 rounded-full mb-3 flex items-center justify-center">
          {item.icon}
        </div>
        <span className="text-base font-semibold text-gray-800">{item.label}</span>
      </div>
    ))}
  </div>
</section>


      {/* Sectors */}
      <section id="sectors" className="bg-white -[#13274f] py-20 px-6 sm:px-20">
        <h2 className="text-2xl font-bold text-center mb-12 underline">Key Investment Sectors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {sectors.map((sec, i) => (
            <div key={i} className="bg-[#13274f] p-6 rounded-lg">
              <div className="mb-4">{sec.icon}</div>
              <h3 className="font-bold mb-2 text-[#B49C5B]">{sec.title}</h3>
              <p className="text-sm text-white">{sec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section id="news" className="bg-white py-20 px-6 sm:px-20">
        <h2 className="text-2xl font-bold mb-6">News & updates</h2>
        <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-sm text-gray-600">News Carousel Placeholder</p>
        </div>
      </section>

      {/* Subsidiaries */}
      <section className="bg-white py-20 px-6 sm:px-20 text-center">
        <h2 className="text-2xl font-bold mb-10">Subsidiaries</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {subsidiaries.map((sub, i) => (
            <a key={i} href={sub.link || "#"} target="_blank" rel="noopener noreferrer" className="bg-[#f1f3f5] p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <Image src={sub.image} alt={sub.name} width={80} height={80} className="mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800">{sub.name}</h3>
              <p className="text-sm text-gray-600">{sub.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 sm:px-20 text-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Why us?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-4">
          We follow a well-defined investment methodology with the goal of reaching the top ranks of major companies that aspire to invest in and build a unique future legacy.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our diverse investments and projects are based on credibility, excellence, and continuous innovation. We provide comprehensive and advanced services to our clients and partners, earning their respect and trust for the long term.
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a1f44] text-white text-center py-8">
        <p className="text-sm">© 2025 Kuwaiti Sudanese Holding Company (KSHC). All rights reserved.</p>
      </footer>
    </main>
  );
}

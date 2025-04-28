'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Hospital, ShoppingBag, Home, Hotel, Factory, Settings, ShieldCheck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TadPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden bg-[#f4f5f7]">

      {/* Background Image */}
      <Image
        src="/fac1.png" // change this to a good facilities image
        alt="TAD Facilities Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col">

        {/* Header */}
        <header className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 sm:px-20 py-6 ${isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-transparent'} transition-all duration-300 z-50`}>
          <div className="text-2xl font-extrabold tracking-wide text-primary text-gray-800">
            TAD
          </div>
          <nav className="hidden sm:flex gap-8 text-md font-medium">
            <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
            <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
            <a href="#vision" className="text-gray-700 hover:text-primary transition">Vision</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="flex items-center justify-center px-8 sm:px-20 pt-40 pb-32 text-center">
          <div className="bg-white/25 backdrop-blur-lg p-12 rounded-2xl border border-white/30 shadow-lg max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Excellence in Facilities Management
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Smarter, safer, more sustainable environments across Sudan.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#services"
                className="bg-gradient-to-r from-orange-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="border border-gray-500 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-white/40 transition"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-8 sm:px-20 py-24 flex justify-center">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-12 border border-white/30 shadow-lg max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">About TAD</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              TAD is a trusted Facilities Management company offering innovative, sustainable, and reliable solutions.
              We focus on operational excellence, safety, and efficiency for all the environments we manage.
            </p>
          </div>
        </section>

        {/* Business Sectors */}
        <section id="sectors" className="px-8 sm:px-20 py-24">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Business Sectors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { name: "Healthcare", icon: <Hospital size={40} /> },
              { name: "Corporate", icon: <Building2 size={40} /> },
              { name: "Retail", icon: <ShoppingBag size={40} /> },
              { name: "Residential", icon: <Home size={40} /> },
              { name: "Hospitality", icon: <Hotel size={40} /> },
              { name: "Industrial", icon: <Factory size={40} /> },
            ].map((sector, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-md hover:shadow-lg flex flex-col items-center text-center border border-white/30 hover:bg-white/30 transition"
              >
                <div className="text-green-700">{sector.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{sector.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Vision and Mission */}
        <section id="vision" className="px-8 sm:px-20 py-24">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Vision & Mission</h2>
          <div className="flex flex-col sm:flex-row gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Vision",
                desc: "To be Sudan’s #1 integrated facilities management provider through innovation and excellence.",
              },
              {
                title: "Mission",
                desc: "Delivering safe, sustainable, and high-quality environments for communities and businesses alike.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl flex-1 shadow-lg text-center border border-white/30"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-8 sm:px-20 py-24">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: "Hard Services", desc: "Electrical, HVAC, plumbing, fire systems.", icon: <Settings size={36} /> },
              { title: "Soft Services", desc: "Cleaning, landscaping, pest control, security.", icon: <ShieldCheck size={36} /> },
              { title: "Specialist Services", desc: "Energy management, asset lifecycle, IoT integration.", icon: <Zap size={36} /> },
            ].map((service, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-md hover:shadow-lg text-center border border-white/30 hover:bg-white/30 transition">
                <div className="text-blue-700 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-700 text-sm mt-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="px-8 sm:px-20 py-24 flex justify-center">
          <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl max-w-3xl text-center border border-white/30 shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Sustainability & Smart Solutions</h2>
            <p className="text-lg text-gray-700">
              TAD is committed to energy efficiency, green facility operations, and leveraging IoT technologies to achieve operational excellence and environmental stewardship.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="text-center py-12">
          <p className="text-sm text-gray-500 mb-4">
            Ready to collaborate with TAD? Let's talk.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-gray-500 px-6 py-3 rounded-full text-gray-900 font-semibold hover:bg-white/40 transition"
          >
            Contact Us
          </Link>
          <p className="text-xs text-gray-500 mt-8">
            © 2025 Total Facilities Management Company (TAD). All rights reserved.
          </p>
        </footer>

      </div>

    </div>
  );
}

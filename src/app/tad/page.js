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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden">

      {/* Global Background Image */}
      <Image
        src="/cover.png" // You can change to a better bg if you want
        alt="TAD Facilities Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">

        {/* Header */}
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 sm:px-20 py-6 bg-transparent backdrop-blur-md shadow-md z-50">
          <div className="text-2xl font-extrabold tracking-wide text-white">
            TAD
          </div>
          <nav className="hidden sm:flex gap-8 text-md font-medium">
            <a href="#about" className="text-gray-400 hover:text-white transition">About</a>
            <a href="#services" className="text-gray-400 hover:text-white transition">Services</a>
            <a href="#vision" className="text-gray-400 hover:text-white transition">Vision</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="flex items-center justify-center px-8 bg-[url('/idk.png')] bg-cover bg-center sm:px-20 py-32 min-h-[80vh]">
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-10 max-w-4xl mx-auto border border-white/20 shadow-xl text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-white leading-tight">
              Excellence in Facilities Management
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Delivering integrated facility management services that create smarter, more sustainable environments across Sudan.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#services"
                className="bg-gradient-to-r from-yellow-700 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-8 sm:px-20 py-24 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-lg max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">About TAD</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              TAD is a leading Facilities Management company in Sudan, offering comprehensive, innovative, and sustainable solutions tailored to meet client needs across diverse sectors.
              Our integrated approach and commitment to service excellence make us a trusted partner in building operationally efficient, safe, and sustainable environments.
            </p>
          </div>
        </section>

        {/* Business Sectors */}
        <section id="sectors" className="px-8 sm:px-20 py-24">
          <h2 className="text-4xl font-bold mb-16 text-center">Business Sectors</h2>
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
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-4 text-center border border-white/20 hover:bg-white/20"
              >
                <div className="text-teal-400">{sector.icon}</div>
                <h3 className="text-xl font-semibold">{sector.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Vision and Mission */}
        <section id="vision" className="px-8 sm:px-20 py-24">
          <h2 className="text-4xl font-bold mb-12 text-center">Vision & Mission</h2>
          <div className="flex flex-col sm:flex-row gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Vision",
                desc: "To be the leading provider of integrated facilities management services in Sudan and beyond.",
              },
              {
                title: "Mission",
                desc: "To deliver exceptional, sustainable, and innovative facility management services that create value for our clients and communities.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl flex-1 shadow-lg border border-white/20 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-8 sm:px-20 py-24">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: "Hard Services", desc: "Electrical, mechanical, HVAC, plumbing, fire systems.", icon: <Settings size={36} /> },
              { title: "Soft Services", desc: "Cleaning, landscaping, security, pest control, waste management.", icon: <ShieldCheck size={36} /> },
              { title: "Specialist Services", desc: "Energy management, asset lifecycle, IoT integration.", icon: <Zap size={36} /> },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-4 text-center border border-white/20 hover:bg-white/20"
              >
                <div className="text-blue-400">{service.icon}</div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="px-8 sm:px-20 py-24 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl max-w-3xl text-center border border-white/20 shadow-lg">
            <h2 className="text-4xl font-bold mb-6">Sustainability & Smart Solutions</h2>
            <p className="text-lg text-gray-300">
              TAD is committed to sustainable practices and the deployment of IoT technologies to optimize building performance,
              reduce energy consumption, and enhance user experiences.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="text-center py-12">
          <p className="text-sm text-gray-500 mb-4">
            Want to collaborate with TAD? Get in touch!
          </p>
          <Link
            href="/contact"
            className="inline-block border border-gray-600 px-6 py-3 rounded-full text-white font-semibold hover:bg-white/10 transition"
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

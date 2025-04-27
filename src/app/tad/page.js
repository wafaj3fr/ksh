'use client';
import Image from "next/image";
import Link from "next/link";

export default function TadPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">

      {/* Header */}
      <header className="flex justify-between items-center px-8 sm:px-20 py-6 bg-black border-b border-gray-800">
        <div className="text-2xl font-extrabold tracking-wide text-white">
          TAD
        </div>
        <nav className="hidden sm:flex gap-8 text-lg">
          <a href="#about" className="text-gray-400 hover:text-white transition">About</a>
          <a href="#services" className="text-gray-400 hover:text-white transition">Services</a>
          <a href="#vision" className="text-gray-400 hover:text-white transition">Vision</a>
          <a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center px-8 sm:px-20 py-24 bg-black">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Excellence in Facilities Management
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Delivering integrated facility management services that create smarter, more sustainable environments across Sudan.
          </p>
          <div className="flex gap-4">
            <a
              href="#services"
              className="bg-gradient-to-r from-blue-600 to-teal-400 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="border border-gray-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"
            >
              Get In Touch
            </a>
          </div>
        </div>
        <div className="bg-gray-900 w-full h-80 rounded-2xl shadow-lg flex items-center justify-center">
          <span className="text-gray-500 text-lg">TAD Image</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 sm:px-20 py-24 bg-black">
        <h2 className="text-3xl font-bold mb-6">About TAD</h2>
        <p className="text-lg leading-relaxed text-gray-400 max-w-3xl">
          TAD is a leading Facilities Management company in Sudan, offering comprehensive, innovative, and sustainable solutions tailored to meet client needs across diverse sectors.
          Our integrated approach and commitment to service excellence make us a trusted partner in building operationally efficient, safe, and sustainable environments.
        </p>
      </section>

      {/* Business Sectors */}
      <section id="sectors" className="px-8 sm:px-20 py-24 bg-gray-900">
        <h2 className="text-3xl font-bold mb-6">Business Sectors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {["Healthcare", "Corporate", "Retail", "Residential", "Hospitality", "Industrial"].map((sector, index) => (
            <div key={index} className="bg-black p-6 rounded-2xl shadow-md flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-white mb-2">{sector}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Vision and Mission */}
      <section id="vision" className="px-8 sm:px-20 py-24 bg-black">
        <h2 className="text-3xl font-bold mb-6">Vision and Mission</h2>
        <p className="text-lg text-gray-400 mb-6">
          <strong>Vision:</strong> To be the leading provider of integrated facilities management services in Sudan and beyond.
        </p>
        <p className="text-lg text-gray-400">
          <strong>Mission:</strong> To deliver exceptional, sustainable, and innovative facility management services that create value for our clients and communities.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 sm:px-20 py-24 bg-gray-900">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { title: "Hard Services", desc: "Electrical, mechanical, HVAC, plumbing maintenance, fire systems." },
            { title: "Soft Services", desc: "Cleaning, landscaping, security, pest control, waste management." },
            { title: "Specialist Services", desc: "Energy management, asset life cycle management, IoT integration." },
          ].map((service, index) => (
            <div key={index} className="bg-black p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
              <p className="text-sm text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="px-8 sm:px-20 py-24 bg-black">
        <h2 className="text-3xl font-bold mb-6">Sustainability and Smart Solutions</h2>
        <p className="text-lg text-gray-400 max-w-3xl">
          TAD is committed to sustainable practices and the deployment of IoT technologies to optimize building performance,
          reduce energy consumption, and enhance user experiences.
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-center py-8 bg-gray-900">
        <p className="text-sm text-gray-500 mb-4">
          Want to collaborate with TAD? Get in touch!
        </p>
        <Link href="/contact" className="inline-block border border-gray-600 px-6 py-3 rounded-2xl text-white font-semibold hover:bg-gray-800 transition">
          Contact Us
        </Link>
        <p className="text-xs text-gray-500 mt-6">
          © 2025 Total Facilities Management Company (TAD). All rights reserved.
        </p>
      </footer>

    </div>
  );
}

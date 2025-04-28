'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Cloud, Server, Phone } from 'lucide-react'; // You can add more icons if you like

export default function QastPage() {
  return (
    <div className="relative min-h-screen text-white font-sans overflow-hidden">

      {/* Global Background */}
      <Image
        src="/cover.png" // Use a suitable premium background
        alt="QAST Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col gap-32">

        {/* Header */}
        <header className="flex justify-between items-center px-8 sm:px-20 py-6 fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50">
          <div className="flex items-center gap-2">
            <Image
              src="/qast-wh.png"
              alt="QAST Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="text-gray-400 hover:text-white transition">Home</a>
            <a href="#about" className="text-gray-400 hover:text-white transition">About</a>
            <a href="#services" className="text-gray-400 hover:text-white transition">Services</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center justify-center text-center gap-6 px-8 sm:px-20 pt-40">
          <div className="backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-4xl ">
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-white">
              QAST: Qualified And Skilled Team
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mt-4">
              Empowering digital transformation through a collective of experts in ICT, cloud systems, and AI innovation.
            </p>

            <div className="mt-6 flex gap-4 flex-wrap justify-center">
              <a
                href="#services"
                className="bg-gradient-to-r from-purple-500 to-blue-700 text-white px-8 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition"
              >
                Get Started
              </a>
              <a
                href="#contact"
                className="border border-white/30 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="flex justify-center px-8 sm:px-20">
          <div className="bg-white/10 backdrop-blur-md p-12 rounded-2xl max-w-5xl text-center shadow-lg border border-white/20">
            <h2 className="text-4xl font-bold mb-6 text-white">About QAST</h2>
            <p className="text-lg text-gray-300">
              <strong>QAST</strong> — a leader in the ICT industry in Sudan, is a subsidiary of the esteemed Kuwaiti Sudanese Holding Company (KSHC) and operates as a sister company to Zain Sudan.
              Our primary focus is to navigate the dynamic nature of ICT infrastructure and deliver exceptional services.
              With a commitment to service delivery, innovation, software development, and customized open-source solutions, QAST is at the forefront of technological advancements.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-8 sm:px-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Business Domains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Information Technology', desc: 'Advanced technology solutions boosting business success.', icon: <Cloud size={36} /> },
              { title: 'Telecom', desc: 'Reliable and innovative telecom services.', icon: <Phone size={36} /> },
              { title: 'Cloud & Hosting', desc: 'Secure, scalable cloud and hosting infrastructure.', icon: <Server size={36} /> },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center gap-4 text-center border border-white/20 hover:bg-white/20"
              >
                <div className="text-purple-400">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="px-8 sm:px-20 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl max-w-4xl text-center shadow-lg border border-white/20">
            <h2 className="text-4xl font-bold mb-6 text-white">Strategic Partners</h2>
            <p className="text-gray-300 mb-8">
              QAST believes in the power of collaboration. We have established partnerships with industry-leading providers, ensuring clients benefit from cutting-edge advancements and world-class solutions.
            </p>
            <div className="bg-white/10 rounded-xl p-8">
              <span className="text-gray-400">[Partner Logos]</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="flex flex-col items-center text-center gap-6 px-8 sm:px-20">
          <div className="bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-lg max-w-2xl border border-white/20">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Partner with QAST?</h2>
            <p className="text-gray-300 mb-6">Get in touch and explore how we can build the future together.</p>
            <a
              href="#contact"
              className="bg-gradient-to-r from-purple-500 to-blue-700 text-white px-8 py-4 rounded-full text-sm font-semibold hover:brightness-110 transition"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="text-center text-gray-500 text-sm pt-16 pb-8">
          <p>© 2025 QAST. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </footer>

      </div>

    </div>
  );
}

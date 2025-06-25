'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import 'aos/dist/aos.css';

export default function TADSection() {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <>
      {/* TAD Hero Section */}
      <section
        className="relative min-h-screen bg-[#222153] text-white flex items-center justify-center px-6 sm:px-20"
        style={{ fontFamily: '"Arial MT", Helvetica, sans-serif' }}
      >
        <div className="relative z-10 text-center max-w-3xl" data-aos="fade-up">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#F29FC5]">
            Smart Facility Management Solutions
          </h1>
          <p className="text-lg sm:text-xl text-[#E0E0F0]">
            Elevating spaces through innovation, efficiency, and sustainability.
          </p>
        </div>
      </section>

      {/* TAD Content Section */}
      <section
        className="min-h-screen bg-[#f5f7fa] text-gray-900 px-6 sm:px-20 py-24 flex items-center"
        style={{ fontFamily: '"Arial MT", Helvetica, sans-serif' }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222153] mb-4">
              About TAD
            </h2>
            <span className="block w-20 h-1 bg-[#87236B] rounded mb-6" />
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              TAD is a professional company providing integrated facility management services and smart building solutions. With a strong focus on sustainability and technology, we support various industries by delivering:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Asset & maintenance management systems</li>
              <li>Cleaning, landscaping, and specialized services</li>
              <li>Energy efficiency & automation systems</li>
              <li>Tailored services for governmental, commercial, and industrial sectors</li>
            </ul>
          </div>

          {/* Right Illustration */}
          <div
            className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg"
            data-aos="fade-left"
          >
            <Image
              src="/facility.jpg"
              alt="TAD Facility Illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
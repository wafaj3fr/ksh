'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import 'aos/dist/aos.css';

export default function TADSection() {
  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });
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

      {/* Mission/Vision - TAD Style */}
      <section className="bg-[#222153] text-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-extrabold text-[#F29FC5] mb-4">Our Vision & Mission</h2>
            <span className="block w-24 h-1 bg-[#F29FC5] rounded mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-[#2c2968] p-8 rounded-xl border border-[#F29FC5]/20 hover:border-[#F29FC5]/50 transition"
            >
              <h3 className="text-xl font-bold text-[#F29FC5] mb-4">Vision</h3>
              <p className="text-[#E7EAEF] leading-relaxed">
                To build a brand that is recognized as a market leader in the region for providing professional, smart, and sustainable total
facilities management solutions and services."
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-[#2c2968] p-8 rounded-xl border border-[#F29FC5]/20 hover:border-[#F29FC5]/50 transition"
            >
              <h3 className="text-xl font-bold text-[#F29FC5] mb-4">Mission</h3>
                <ul className="list-disc list-inside text-[#E7EAEF] space-y-2 leading-relaxed">
                <li>
                  Being commercially astute in targeting strategically aligned business opportunities within our chosen markets through continuous improvement.
                </li>
                <li>
                  Improving corporate governance for effective direction and control.
                </li>
                <li>
                  Creating a high-performance culture that respects individuals, trains and develops personnel, and rewards achievement.
                </li>
                <li>
                  Providing innovative FM solutions and a high level of service delivery that is cost-effective and meets international benchmarks.
                </li>
                </ul>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-[#2c2968] p-8 rounded-xl border border-[#F29FC5]/20 hover:border-[#F29FC5]/50 transition"
            >
              <h3 className="text-xl font-bold text-[#F29FC5] mb-4">Goal</h3>
              <p className="text-[#E7EAEF] leading-relaxed">
                Delivering a complete suite of both hard and soft offerings to
companies across North and East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Structure - TAD Style */}
      <section className="bg-[#2c2968] text-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-extrabold text-[#F29FC5] mb-4">Management Structure</h2>
            <span className="block w-24 h-1 bg-[#F29FC5] rounded mx-auto" />
          </div>

          {/* Top Manager */}
          <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#222153] rounded-xl shadow-lg p-6 border border-[#F29FC5] w-64 hover:bg-[#1d1c45] transition">
              <h3 className="font-bold text-[#F29FC5]">Name</h3>
              <p className="text-sm text-[#E7EAEF]">Position</p>
              <p className="text-xs text-gray-400">Sudanese</p>
            </div>
          </div>

          {/* Sub Managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
            ].map((m, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
                className="bg-[#222153] rounded-xl shadow-lg p-6 border border-[#F29FC5]/50 hover:border-[#F29FC5] hover:bg-[#1d1c45] transition"
              >
                <h3 className="font-bold text-white">{m.name}</h3>
                <p className="text-sm text-[#E7EAEF]">{m.title}</p>
                <p className="text-xs text-gray-400">{m.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
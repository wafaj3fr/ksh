"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function QASTSection() {
  return (
    <>
      <section id="qast" className="w-full bg-[#0c0b0b] text-white">
        {/* Section 1 - Introduction */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="max-w-5xl"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#AC2E5D] mb-4">
              QAST – Innovation in Technology
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              QAST is a Network Services & Information Technology Management company committed to elevating Sudan's digital infrastructure. Our solutions are tailored to empower businesses and communities through innovation, reliability, and cutting-edge services.
            </p>
          </motion.div>
        </div>

        {/* Section 2 - Visual and Details */}
        <div className="min-h-screen grid md:grid-cols-2 items-center px-6 sm:px-20 py-24 gap-16 bg-[#1a1a1a]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#AC2E5D]">Our Role</h3>
            <p className="text-gray-200 text-md leading-relaxed">
              As a pioneer in ICT services, QAST supports organizations by delivering network infrastructure, managed services, and innovative IT consulting. Our vision is to be the digital transformation partner of choice in the region.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Enterprise IT Infrastructure</li>
              <li>Managed IT & Security Services</li>
              <li>Smart Digital Solutions</li>
              <li>Cloud and Data Services</li>
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="w-full h-[300px] sm:h-[400px] relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="/telecom.jpg"
              alt="QAST Technology Illustration"
              fill
              className="object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission/Vision - QAST Light Style */}
      <section className="bg-[#f8fafc] px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#020202] mb-4">Our Vision & Mission</h2>
            <span className="block w-24 h-1 bg-[#AC2E5D] rounded mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#AC2E5D]/20 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#AC2E5D] mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a leading ICT managed service and solutions provider in the region and Sudan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#AC2E5D]/20 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#AC2E5D] mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Building strong organization by investing on our people, new technologies and processes as to deliver the highest level of solutions and services to provide the maximum value to all stakeholders.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#AC2E5D]/20 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#AC2E5D] mb-4">Our Values</h3>
              <p className="text-gray-700 leading-relaxed">
                Professionalism: Demonstrate strong work commitments, treat others with respect and accountability.
                Integrity: Engage in activities aligned with moral and ethical standards, building trust with clients, partners, and stakeholders.
                Customer Centricity: Respect and fulfill customer needs, provide tailored support for their goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Management Structure - QAST Light Style */}
      <section className="bg-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#020202] mb-4">Management Structure</h2>
            <span className="block w-24 h-1 bg-[#AC2E5D] rounded mx-auto" />
          </motion.div>

          {/* Top Manager */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#AC2E5D] w-64 hover:shadow-xl transition">
              <h3 className="font-bold text-[#AC2E5D]">Name</h3>
              <p className="text-sm text-gray-600">Position</p>
              <p className="text-xs text-gray-500">Sudanese</p>
            </div>
          </motion.div>

          {/* Sub Managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
            ].map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-[#AC2E5D]/50 hover:border-[#AC2E5D] hover:shadow-xl transition"
              >
                <h3 className="font-bold text-[#020202]">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.title}</p>
                <p className="text-xs text-gray-500">{m.dept}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
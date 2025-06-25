"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function QASTSection() {
  return (
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
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#e84299] mb-4">
            QAST – Innovation in Technology
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            QAST is a Network Services & Information Technology Management company committed to elevating Sudan’s digital infrastructure. Our solutions are tailored to empower businesses and communities through innovation, reliability, and cutting-edge services.
          </p>
        </motion.div>
      </div>

      {/* Section 2 - Visual and Details */}
      <div className="grid md:grid-cols-2 items-center px-6 sm:px-20 py-24 gap-16 bg-[#1a1a1a]">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h3 className="text-3xl font-bold text-[#e84299]">Our Role</h3>
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
  );
}

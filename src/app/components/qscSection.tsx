"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function QSCSection() {
  return (
    <section id="qsc" className="text-white font-['Lora']">
      {/* Section 1: Hero */}
      <div className="min-h-screen bg-[#5F2C9B] flex flex-col justify-center items-center text-center px-6 sm:px-20 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-bold drop-shadow tracking-tight"
        >
          Excellence in <span className="text-[#FFD700]">Supply Chain</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg sm:text-2xl text-white/90 mt-6 max-w-2xl"
        >
          Delivered with <span className="font-semibold text-[#FFD700]">Quality</span>
        </motion.p>
      </div>

      {/* Section 2: Company Info */}
      <div className="min-h-screen bg-white text-gray-900 px-6 sm:px-20 py-24 flex flex-col justify-center font-['Lora']">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-[#5F2C9B] mb-4">
              Quality for Supply Chain
            </h3>
            <span className="block w-20 h-1 bg-[#C49A38] rounded mb-6" />
            <p className="text-lg leading-relaxed">
              We provide end-to-end supply chain solutions — from logistics, transport,
              customs clearance, to modern storage and door-to-door services.
            </p>
            <p className="text-lg mt-4 leading-relaxed">
              Our mission is to ensure seamless operations, cost efficiency, and
              client satisfaction across the supply chain. Our strength lies in our
              deep market knowledge and a commitment to excellence.
            </p>
          </motion.div>

          {/* Image or Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <Image
              src="/logistics.jpg" // replace with actual optimized image path
              alt="Quality Supply Chain"
              width={500}
              height={400}
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
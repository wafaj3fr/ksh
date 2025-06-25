"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CubesSection() {
  return (
    <section id="cubes" className="w-full text-white font-sans">
      {/* Section 1 - Hero Style */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-20 text-center bg-[#D25C15] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold tracking-tight z-10 font-[serif]"
        >
          Building the Future with <span className="text-[#fff]">Cubes</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-xl text-black mt-6 max-w-3xl z-10"
        >
          Transforming Sudan’s urban spaces with innovation and sustainability.
        </motion.p>
      </div>

      {/* Section 2 - Company Intro */}
      <div className="min-h-screen bg-white text-gray-900 px-6 sm:px-20 py-24 flex flex-col justify-center font-['Raleway']">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-[#D25C15] mb-4">
              About Cubes
            </h3>
            <span className="block w-20 h-1 bg-[#F8CBA6] rounded mb-6" />
            <p className="text-lg leading-relaxed">
              Cubes is a construction and real estate development company committed
              to delivering modern, functional, and innovative buildings across Sudan.
            </p>
            <p className="text-lg mt-4 leading-relaxed">
              We focus on quality infrastructure, blending design excellence with
              sustainable practices — offering residential, commercial, and
              mixed-use solutions.
            </p>
          </motion.div>

          {/* Illustration or image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <Image
              src="/realestate.jpg"
              alt="Cubes Construction"
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
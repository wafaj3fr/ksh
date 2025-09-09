"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CubesSection() {
  return (
    <>
      <section id="cubes" className="w-full text-white font-sans">
        {/* Section 1 - Hero Style */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-20 text-center bg-[#075869] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-0" />
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold tracking-tight z-10 font-[serif]"
          >
            Building the Future with{" "}
            <span className="text-[#A84A11]">Cubes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl text-white/90 mt-6 max-w-3xl z-10"
          >
            Transforming Sudan's urban spaces with innovation and sustainability.
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
              <h3 className="text-3xl font-bold text-[#075869] mb-4">
                About Cubes
              </h3>
              <span className="block w-20 h-1 bg-[#A84A11] rounded mb-6" />
              <p className="text-lg leading-relaxed">
                Cubes is a construction and real estate development company
                committed to delivering modern, functional, and innovative
                buildings across Sudan.
              </p>
              <p className="text-lg mt-4 leading-relaxed">
                We focus on quality infrastructure, blending design excellence
                with sustainable practices — offering residential, commercial,
                and mixed-use solutions.
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

      {/* Mission/Vision - Cubes Light Style */}
      <section className="bg-[#f8fafc] px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#075869] mb-4">
              Our Vision & Mission
            </h2>
            <span className="block w-24 h-1 bg-[#A84A11] rounded mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#A84A11]/20 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#A84A11] mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a leading construction company, delivering sustainable and innovative building solutions, supported by best project management practices to achieve the highest standards of quality and efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#A84A11]/20 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#A84A11] mb-4">Mission</h3>
                <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Deliver high-quality projects that meet global standards, adhering to timelines and budgets.</li>
                <li>Leverage the latest construction technologies to ensure sustainability and efficiency.</li>
                <li>Promote a strong project management culture through our PMO to enhance project execution.</li>
                <li>Build long-term relationships with clients and partners based on transparency and trust.</li>
                <li>Develop our human capital by providing continuous training and fostering a motivating work environment.</li>
                </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#A84A11]/20 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-[#A84A11] mb-4">Values</h3>
                <ul className="text-gray-700 leading-relaxed list-disc list-inside">
                <li>Quality – Striving for excellence in every project we undertake.</li>
                <li>Innovation – Integrating the latest technologies and modern methodologies in construction.</li>
                <li>Safety – Ensuring a safe working environment for employees and project teams.</li>
                <li>Commitment – Meeting deadlines and fulfilling our promises to clients.</li>
                <li>Transparency – Building trust through honesty and open communication.</li>
                <li>Sustainability – Committed to eco-friendly and energy-efficient building solutions.</li>
                <li>Professionalism – Managing projects with best-in-class project management practices.</li>
                </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Management Structure - Cubes Light Style */}
      <section className="bg-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#075869] mb-4">
              Management Structure
            </h2>
            <span className="block w-24 h-1 bg-[#A84A11] rounded mx-auto" />
          </motion.div>

          {/* Top Manager */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#A84A11] w-64 hover:shadow-xl transition">
              <h3 className="font-bold text-[#075869]">Name</h3>
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
                className="bg-white rounded-xl shadow-lg p-6 border border-[#A84A11]/50 hover:border-[#A84A11] hover:shadow-xl transition"
              >
                <h3 className="font-bold text-[#075869]">{m.name}</h3>
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
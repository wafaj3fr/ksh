"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function QSCSection() {
  return (
    <>
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
            Delivered with{" "}
            <span className="font-semibold text-[#FFD700]">Quality</span>
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
              <span className="block w-20 h-1 bg-[#FFD700] rounded mb-6" />
              <p className="text-lg leading-relaxed">
                We provide end-to-end supply chain solutions — from logistics,
                transport, customs clearance, to modern storage and door-to-door
                services.
              </p>
              <p className="text-lg mt-4 leading-relaxed">
                Our mission is to ensure seamless operations, cost efficiency, and
                client satisfaction across the supply chain. Our strength lies in
                our deep market knowledge and a commitment to excellence.
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
                src="/logistics.jpg"
                alt="Quality Supply Chain"
                width={500}
                height={400}
                className="rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission/Vision - QSC Light Style */}
      <section className="bg-[#5F2C9B] text-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#FFD700] mb-4">
              Our Vision & Mission
            </h2>
            <span className="block w-24 h-1 bg-[#FFD700] rounded mx-auto" />
          </motion.div>

          {/* Centered Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#FFD700]/20 hover:shadow-xl transition w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                We aspire to be the leader in the supply chain industry in Sudan,
                offering our local and international clients innovative and efficient
                solutions to streamline the movement of goods and distribution. Our
                vision is to help strengthen the Sudanese economy by becoming a
                trusted partner to our clients, through safety, reliability, and
                excellence in service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-[#FFD700]/20 hover:shadow-xl transition w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                At Q Supply Chain, our mission is to provide integrated,
                technology-driven solutions in supply chain services that meet the
                needs of our clients across purchasing, shipping, customs clearance,
                storage, distribution, and door-to-door delivery. We aim to be the
                number one choice for all our clients by offering unparalleled
                service while ensuring the highest levels of safety and quality.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-extrabold text-[#FFD700] mb-4">
              Our Objectives
            </h2>
            <span className="block w-24 h-1 bg-[#FFD700] rounded mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {/* Objective 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-start gap-4 bg-[#5F2C9B] p-6 rounded-lg shadow-lg border border-[#FFD700]/50"
            >
              <div className="text-[#FFD700] text-3xl">
                <i className="fas fa-lightbulb"></i> {/* Replace with your preferred icon library */}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Continuous Innovation</h3>
                <p className="text-sm leading-relaxed">
                  We strive to continuously enhance our services by adopting the latest technologies and systems.
                </p>
              </div>
            </motion.div>

            {/* Objective 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-start gap-4 bg-[#5F2C9B] p-6 rounded-lg shadow-lg border border-[#FFD700]/50"
            >
              <div className="text-[#FFD700] text-3xl">
                <i className="fas fa-star"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Excellence in Quality</h3>
                <p className="text-sm leading-relaxed">
                  Our focus is on delivering top-quality services with meticulous attention to detail, ensuring customer satisfaction.
                </p>
              </div>
            </motion.div>

            {/* Objective 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-start gap-4 bg-[#5F2C9B] p-6 rounded-lg shadow-lg border border-[#FFD700]/50"
            >
              <div className="text-[#FFD700] text-3xl">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Safety & Reliability</h3>
                <p className="text-sm leading-relaxed">
                  We are committed to providing secure and reliable storage environments, backed by advanced fire suppression systems.
                </p>
              </div>
            </motion.div>

            {/* Objective 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-start gap-4 bg-[#5F2C9B] p-6 rounded-lg shadow-lg border border-[#FFD700]/50"
            >
              <div className="text-[#FFD700] text-3xl">
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Expansion & Leadership</h3>
                <p className="text-sm leading-relaxed">
                  We aim for sustainable growth and expansion in both the local and regional markets, establishing a strong presence in the supply chain industry.
                </p>
              </div>
            </motion.div>

            {/* Objective 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-start gap-4 bg-[#5F2C9B] p-6 rounded-lg shadow-lg border border-[#FFD700]/50"
            >
              <div className="text-[#FFD700] text-3xl">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Investment in Human Capital</h3>
                <p className="text-sm leading-relaxed">
                  We believe in the power of human resources and are dedicated to training and developing our team to ensure the best service for our clients.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Management Structure - QSC Light Style */}
      <section className="bg-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-extrabold text-[#5F2C9B] mb-4">
              Management Structure
            </h2>
            <span className="block w-24 h-1 bg-[#FFD700] rounded mx-auto" />
          </motion.div>

          {/* Top Manager */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-[#5F2C9B] text-white rounded-xl shadow-lg p-6 border-2 border-[#FFD700] w-64 hover:shadow-xl transition">
              <h3 className="font-bold text-[#FFD700]">Name</h3>
              <p className="text-sm text-white/80">Position</p>
              <p className="text-xs text-white/60">Sudanese</p>
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
                className="bg-[#5F2C9B] text-white rounded-xl shadow-lg p-6 border border-[#FFD700]/50 hover:border-[#FFD700] hover:shadow-xl transition"
              >
                <h3 className="font-bold text-white">{m.name}</h3>
                <p className="text-sm text-white/80">{m.title}</p>
                <p className="text-xs text-white/60">{m.dept}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
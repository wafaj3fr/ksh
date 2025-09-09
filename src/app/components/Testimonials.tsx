"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "I do admire the company culture and I like that. Visioncraft is truly the place where good attitudes have blended with proficiency.",
    author: "James Olson",
    role: "Product Designer",
  },
  {
    text: "If you’re going to craft something great and you have a strong eagerness to do that, Visioncraft will remove all hassles in your journey.",
    author: "Sarah Ali",
    role: "Marketing Manager",
  },
  {
    text: "Working with KSHC has been a transformative experience. Their vision and professionalism are unmatched.",
    author: "Mohamed Ahmed",
    role: "CEO, Partner Company",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-white px-6 sm:px-20 py-24">
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="text-3xl font-extrabold text-primary mb-6">
          Don’t just take our word for it!
        </h2>
        <span className="block w-20 h-1 bg-[#B49C5B] rounded mx-auto mb-10" />

        {/* Slider */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-[#f7f9fc] rounded-xl p-8 shadow"
            >
              <p className="text-gray-700 italic mb-4">
                "{testimonials[index].text}"
              </p>
              <h4 className="text-primary font-semibold">
                {testimonials[index].author}
              </h4>
              <p className="text-sm text-gray-600">{testimonials[index].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

export default function Customers() {
  const logos = [
    { name: "Zain Sudan", logo: "/zain.png" },
    { name: "QAST", logo: "/qast-logo.png" },
    { name: "Embassy of Kuwait", logo: "/embassy.png" },
  ];

  return (
    <section className="bg-white px-6 sm:px-20 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-primary mb-6">Our Customers</h2>
        <span className="block w-20 h-1 bg-[#B49C5B] rounded mx-auto mb-10" />
        <div className="flex flex-wrap justify-center items-center gap-10">
          {logos.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-40 h-20 relative grayscale hover:grayscale-0 transition mb-3">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function AboutTeaser() {
  return (
    <section id="about" className="relative bg-white px-6 sm:px-20 pt-24 pb-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Left - Text Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">
              Discover Our Story
            </h2>
            <span className="block w-24 h-1 bg-[#B49C5B] rounded" />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Kuwaiti Sudanese Holding Company is an innovative and dynamic investment group that keeps pace with the latest investment developments in Sudan. It is committed to leading in its unique fields, striving for excellence through integrated efforts in all its investments. Established with the goal of leadership, the company oversees numerous ventures, each contributing individually and collectively to the realization of the company’s core objectives.
          </p>
          
          <Link
            href="/about"
            className="inline-block bg-[#B49C5B] text-black font-semibold px-5 py-2 rounded shadow-md hover:bg-[#a88a46] transition duration-300"
          >
            Learn More →
          </Link>
        </div>

        {/* Right - Illustration */}
        <div className="flex justify-center">
          <Image
            src="/about.png"
            alt="About illustration"
            width={420}
            height={420}
            className="max-w-full h-auto rounded-xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

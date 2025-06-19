import Image from "next/image";
import PageHero from "../components/PageHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      <PageHero
        title="About Us"
        subtitle="Learn more about our mission, values, and what makes KSHC unique."
        image="/public/about.png" // استبدله بصورتك الفعلية أو ضع illustation
      />
      <section className="relative bg-[#e7ebf0] px-6 sm:px-20 pt-32 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
          {/* Left - About Content */}
          <div className="space-y-6">
            <span className="inline-block bg-[#B49C5B] text-[#0a1f44] font-semibold px-4 py-1 rounded shadow-md w-fit">
              About Us
            </span>
            <h1 className="text-4xl font-extrabold text-primary mb-4">Who We Are</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Kuwaiti Sudanese Holding Company is an innovative and dynamic investment group committed to Sudan’s growth and prosperity. We lead with vision, credibility, and a passion for excellence, building a sustainable legacy through strategic investments and partnerships.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to bring global technologies and business practices to Sudan, aligning the country with international advancements and fostering economic development across key sectors.
            </p>
          </div>
          {/* Right - Illustration */}
          <div className="flex justify-center">
            <Image
              src="/Frame 54.png"
              alt="About illustration"
              width={420}
              height={420}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Values / Highlights */}
      <section className="max-w-5xl mx-auto px-6 sm:px-20 py-20">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              title: "Credibility",
              desc: "We operate with transparency and integrity, earning the trust of our partners and stakeholders.",
              icon: (
                <svg className="w-8 h-8 text-[#B49C5B] mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
            },
            {
              title: "Innovation",
              desc: "We embrace new ideas and technologies to drive progress and create lasting impact.",
              icon: (
                <svg className="w-8 h-8 text-[#B49C5B] mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              ),
            },
            {
              title: "Excellence",
              desc: "We strive for the highest standards in everything we do, delivering value and quality.",
              icon: (
                <svg className="w-8 h-8 text-[#B49C5B] mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl p-8 text-center border border-[#B49C5B] flex flex-col items-center"
            >
              <div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
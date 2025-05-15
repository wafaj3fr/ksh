import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Target, Globe, Users, TrendingUp, Layers, Building, Wifi, Truck, Hammer } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-900 font-sans bg-[#f5f7fa]">
      {/* Header */}
      <header className="flex justify-between items-center px-8 sm:px-20 py-6 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-primary">KSHC</div>
        <nav className="hidden sm:flex gap-8 text-md font-medium">
          <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
          <a href="#sectors" className="text-gray-700 hover:text-primary transition">Sectors</a>
          <a href="#subsidiaries" className="text-gray-700 hover:text-primary transition">Subsidiaries</a>
          <a href="#news" className="text-gray-700 hover:text-primary transition">News</a>
          <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden text-gray-800">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {isOpen && (
          <div className="absolute top-20 right-8 bg-white shadow-lg p-6 rounded-xl flex flex-col gap-4 sm:hidden">
            <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
            <a href="#sectors" className="text-gray-700 hover:text-primary transition">Sectors</a>
            <a href="#subsidiaries" className="text-gray-700 hover:text-primary transition">Subsidiaries</a>
            <a href="#news" className="text-gray-700 hover:text-primary transition">News</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="text-center px-8 sm:px-20 py-40 min-h-[600px] bg-[url('/banner.png')] bg-cover bg-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-primary leading-tight text-white">
          We Aspire to Excellence<br />Through Integration
        </h1>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto">
          A Leading Investment Group Driven by Innovation and Vision
        </p>
      </section>

      <section id="vision" className="px-8 sm:px-20 py-24 bg-gray-100">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
    <h2 className="text-4xl font-bold text-gray-900">The Kuwaiti Sudanese Holding Company</h2>
    <p className="text-lg text-gray-600">KSHC is an innovative investment group advancing economic development in Sudan through strategic and integrated ventures.</p>

    {/* Image / Illustration */}
    <div className="flex justify-center">
      <Image
        src="/20824346_6342383.svg"
        alt="Vision illustration"
        width={400}
        height={400}
        
      />
    </div>

    {/* Text Content */}
    <div className="text-center md:text-left">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        Building the <span className="text-gray-600">Foundations</span> of a <span className="text-gray-600">Better Future</span>
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        At KSHC, we strive to shape a resilient and thriving economy through innovation, integrated ventures, and transformative partnerships. Our focus is on <span className="font-medium text-gray-700">long-term impact</span>, <span className="font-medium text-gray-700">community upliftment</span>, and preparing Sudan for the opportunities of tomorrow.
      </p>
    </div>
  </div>
</section>

      {/* About Section */}
<section id="about" className="px-8 sm:px-20 py-24 bg-white text-gray-800">
  <div className="max-w-6xl mx-auto text-center space-y-12">
    {/* <h2 className="text-4xl font-bold text-gray-900">The Kuwaiti Sudanese Holding Company</h2>
    <p className="text-lg text-gray-600">KSHC is an innovative investment group advancing economic development in Sudan through strategic and integrated ventures.</p> */}

    <div className="grid sm:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
        <div className="flex items-center gap-4 mb-3">
          <Globe className="text-gray-600" size={28} />
          <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
        </div>
        <p className="text-gray-700">To establish the largest economic group with foreign capital contributing to Sudan’s growth.</p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
        <div className="flex items-center gap-4 mb-3">
          <Target className="text-gray-600" size={28} />
          <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
        </div>
        <p className="text-gray-700">Supporting the Sudanese economy internally and bringing global innovations externally.</p>
      </div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {[
        { icon: <Users className="text-gray-600" size={28} />, title: "Kuwait-Sudan Ties", desc: "Strengthening economic relationships between Kuwait and Sudan." },
        { icon: <TrendingUp className="text-gray-600" size={28} />, title: "Reconstruction Focus", desc: "Supporting post-conflict rebuilding efforts in Sudan." },
        { icon: <Layers className="text-gray-600" size={28} />, title: "Smart Investments", desc: "Investing in impactful sectors that drive innovation." },
        { icon: <Users className="text-gray-600" size={28} />, title: "Talent Development", desc: "Nurturing innovation and Sudanese professionals." },
        { icon: <Target className="text-gray-600" size={28} />, title: "Social Responsibility", desc: "Building community connections across generations." },
        { icon: <Globe className="text-gray-600" size={28} />, title: "Smart Partnerships", desc: "Expanding impact through collaboration and strong asset management." },
      ].map((goal, i) => (
        <div key={i} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
          <div className="flex items-center gap-4 mb-3">
            {goal.icon}
            <h4 className="text-md font-semibold text-gray-800">{goal.title}</h4>
          </div>
          <p className="text-gray-700 text-sm">{goal.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section id="services" className="px-8 sm:px-20 py-24 bg-gray-100">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Investment Sectors</h2>
    <p className="text-lg text-gray-700 mb-12">
      Driving progress across essential sectors through strategic and specialized investment.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "Telecom & Technology",
          desc: "Empowering connectivity and innovation through advanced ICT infrastructure.",
          icon: <Wifi className="text-gray-600" size={32} />
        },
        {
          title: "Real Estate & Development",
          desc: "Planning and managing sustainable urban and commercial growth.",
          icon: <Building className="text-gray-600" size={32} />
        },
        {
          title: "Supply Chain & Logistics",
          desc: "Streamlining procurement, storage, and distribution systems nationwide.",
          icon: <Truck className="text-gray-600" size={32} />
        },
        {
          title: "Facility Management",
          desc: "Delivering integrated smart solutions for modern infrastructure.",
          icon: <Hammer className="text-gray-600" size={32} />
        }
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-left">
          <div className="flex items-center gap-4 mb-4">
            {item.icon}
            <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
          </div>
          <p className="text-sm text-gray-700">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Subsidiaries Section */}
      <section id="subsidiaries" className="px-8 sm:px-20 py-20 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">KSHC Subsidiaries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { name: "Qast", desc: "ICT & Network Services", image: "cpu.png", link: "https://qasthub.com/" },
            { name: "Cubes", desc: "Construction & Real Estate", image: "fac1.png" },
            { name: "TAD", desc: "Facility Management Solutions", image: "fac2.png" },
            { name: "Quality", desc: "Supply Chain Services", image: "fac3.png" },
          ].map((sub, i) => (
            <Link key={i} href={sub.link || "#"} target="_blank">
              <div className="bg-[#f9fafb] p-6 rounded-xl shadow hover:shadow-md transition-all">
                <Image src={`/${sub.image}`} alt={sub.name} width={400} height={300} className="rounded-lg mb-4 object-cover w-full h-40" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{sub.name}</h3>
                <p className="text-sm text-gray-600">{sub.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* News & Updates */}
      <section id="news" className="px-8 sm:px-20 py-20 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary">News & Updates</h2>
          {/* Placeholder for dynamic news - replace with dynamic content */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6 text-left">
              <h4 className="font-semibold text-lg mb-2">KSHC Launches New Investment Initiative</h4>
              <p className="text-gray-600 text-sm mb-2">May 2025</p>
              <p className="text-gray-700 text-sm">KSHC announces a new investment initiative focused on sustainable infrastructure in Sudan.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-left">
              <h4 className="font-semibold text-lg mb-2">Partnership with Global Tech Leaders</h4>
              <p className="text-gray-600 text-sm mb-2">April 2025</p>
              <p className="text-gray-700 text-sm">KSHC partners with leading technology firms to drive digital transformation in the region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="px-8 sm:px-20 py-20 bg-[#f7f9fc]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">CEO's Message</h2>
          <p className="text-lg text-gray-600">
            At KSHC, we pride ourselves on being a Kuwaiti-backed company contributing to Sudan’s economy. We strive for sustainable growth, market-aligned investments, and empowering Sudanese talent. Our values and vision guide us toward making a lasting impact on our country and community.
          <p className="mt-6 text-gray-700 font-medium">— Mahmoud Alassad</p>
          </p>
        </div>
      </section>


<section className="px-8 sm:px-20 py-24 bg-gradient-to-br from-[#f7faff] via-white to-[#f4f8ff]">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">Establishment & Leadership</h2>
    <p className="text-gray-600 text-lg mb-12">
      Officially established under the <strong>Sudanese Companies Law</strong>, KSHC is governed by an experienced board of visionaries.
    </p>

    {/* Board Cards */}
    <div className="grid sm:grid-cols-3 gap-8">
      {[
        {
          name: "Maj. Gen. Pilot Al-Fateh Mohamed Ahmed Aroua",
          role: "Chairman",
          image: "/avatar4.png"
        },
        {
          name: "Hisham Mustafa Allam",
          role: "Board Member",
          image: "/avatar2.png"
        },
        {
          name: "Osama Michel Matta",
          role: "Board Member",
          image: "/avatar.png"
        },
      ].map((member, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
          <Image
            src={member.image}
            alt={member.name}
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Why Us */}
      <section className="px-8 sm:px-20 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Why Choose KSHC?</h2>
        <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto">
          We follow a strategic, credible, and innovative investment methodology to build a sustainable and impactful legacy through comprehensive services and long-term trust with our partners.
        </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 sm:px-20 py-16 bg-primary text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Partner or Invest?</h2>
        <p className="text-lg mb-6">Contact us to explore investment opportunities or join our growing team.</p>
        <a href="#contact" className="inline-block px-8 py-3 bg-white text-primary rounded-full font-semibold shadow hover:bg-gray-100 transition">
          Get in Touch
        </a>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-center py-10 bg-gray-100 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2025 Kuwaiti Sudanese Holding Company (KSHC). All rights reserved.
        </p>
      </footer>
    </div>
  );
}

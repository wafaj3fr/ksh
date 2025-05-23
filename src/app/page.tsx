import { getCEOMessage, getInvestmentSectors, getNews, getSettings, getSubsidiaries } from "../sanity/sanity-utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Subsidiaries from "./components/Subsidiaries";
import News from "./components/News";
import CEOMessage from "./components/CEOMessage";
import Sectors from "./components/Sectors";
import { Award, Eye, Globe, Mountain, Target, TrendingUp, Users, Layers } from "lucide-react";
import Image from "next/image";


export default async function Home() {
  const [settings, subsidiaries, news, ceoMessage, sectors] = await Promise.all([
    getSettings(),
    getSubsidiaries(),
    getNews(),
    getCEOMessage(),
    getInvestmentSectors(),
  ]);

  return (
    <div className="min-h-screen text-gray-900 font-sans bg-[#f5f7fa]">
      <Header logo={settings?.logo} />
      <Hero
       heroMediaType={settings.heroMediaType}
       videoSource={settings.videoSource}
       heroImage={settings.heroImage}
       heroVideoFile={settings.heroVideoFile}
       heroVideoUrl={settings.heroVideoUrl}
       heroTitle={settings.heroTitle}
       heroSubtitle={settings.heroSubtitle}
      />
      <section id="about" className="relative bg-[#e7ebf0] px-6 sm:px-20 pt-24 pb-48">
  {/* Split Layout */}
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
    {/* Left - Text Content */}
    <div className="space-y-6">
      <span className="inline-block bg-[#B49C5B] text-[#0a1f44] font-semibold px-4 py-1 rounded shadow-md w-fit">
        About Us
      </span>
      <p className="text-lg text-gray-700 leading-relaxed">
        The Kuwaiti Sudanese Holding Company is an innovative and dynamic investment group that keeps pace with the latest investment developments in Sudan. It is committed to leading in its unique fields, striving for excellence through integrated efforts in all its investments.
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

  {/* Vision / Mission / Goal Cards */}
  <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
    <div className="grid sm:grid-cols-3 gap-6 justify-center">
      {[
        {
          title: "Vision",
          desc: "To establish the largest economic group with foreign capital contributing to Sudan’s growth.",
          icon: <Eye className="text-primary w-8 h-8 mx-auto" />
        },
        {
          title: "Mission",
          desc: "Bringing global technologies and business practices to Sudan, aligning the country with global advancements.",
          icon: <Mountain className="text-primary w-8 h-8 mx-auto" />
        },
        {
          title: "Goal",
          desc: "Strengthening Kuwait–Sudan ties, rebuilding post-conflict Sudan, and investing in high-impact sectors.",
          icon: <Target className="text-primary w-8 h-8 mx-auto" />
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-xl p-6 text-center border border-[#B49C5B] flex flex-col items-center"
        >
          <div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
            {item.icon}
          </div>
          <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Objectives */}
      <section id="objectives" className="bg-white pt-48 pb-24 px-6 sm:px-20">
  <h2 className="text-2xl font-bold text-center text-primary mb-10">General Objectives</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
    {[
      {
        label: "Kuwait–Sudan Ties",
        icon: <Globe className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Post-conflict Reconstruction",
        icon: <Award className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Smart Investments",
        icon: <TrendingUp className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Talent Development",
        icon: <Users className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Social Responsibility",
        icon: <Target className="text-primary w-7 h-7 mx-auto" />
      },
      {
        label: "Smart Partnerships",
        icon: <Layers className="text-primary w-7 h-7 mx-auto" />
      },
    ].map((item, idx) => (
      <div key={idx} className="flex flex-col items-center ">
        <div className="bg-primary/10 p-4 rounded-full mb-3 flex items-center justify-center">
          {item.icon}
        </div>
        <span className="text-base font-semibold text-gray-800">{item.label}</span>
      </div>
    ))}
  </div>
</section>
      <Sectors sectors={sectors} />
      <Subsidiaries subsidiaries={subsidiaries} />
      <News news={news} />
      <CEOMessage message={ceoMessage?.message} imageUrl={ceoMessage?.image?.asset?.url} />
      <footer className="bg-gray-900 text-gray-100 pt-16 pb-8 mt-16">
  <div className="max-w-7xl mx-auto px-6 sm:px-20 grid grid-cols-1 md:grid-cols-4 gap-12">
    {/* Company Info */}
    <div>
      <div className="text-2xl font-bold text-[#B49C5B] mb-4">KSHC</div>
      <p className="text-gray-400 mb-4">
        Kuwaiti Sudanese Holding Company is a leading investment group advancing Sudan’s economic growth through innovation and strategic partnerships.
      </p>
      <div className="flex gap-4 mt-4">
        <a href="#" className="hover:text-[#B49C5B]" aria-label="Twitter">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.883.392-1.832.656-2.828.775a4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.924 2.205-4.924 4.924 0 .386.044.763.127 1.124C7.728 8.82 4.1 6.884 1.671 3.965c-.423.724-.666 1.562-.666 2.457 0 1.695.863 3.19 2.175 4.068-.802-.025-1.557-.246-2.217-.616v.062c0 2.367 1.684 4.342 3.918 4.788-.41.112-.843.172-1.288.172-.316 0-.623-.03-.922-.086.624 1.951 2.432 3.372 4.576 3.412A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.56z"/></svg>
        </a>
        <a href="#" className="hover:text-[#B49C5B]" aria-label="LinkedIn">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74z"/></svg>
        </a>
      </div>
    </div>
    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-[#B49C5B] mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="/about" className="hover:text-[#B49C5B] transition">About Us</a></li>
        <li><a href="/subsidiaries" className="hover:text-[#B49C5B] transition">Subsidiaries</a></li>
        <li><a href="/news" className="hover:text-[#B49C5B] transition">News & Media</a></li>
        <li><a href="/careers" className="hover:text-[#B49C5B] transition">Careers</a></li>
        <li><a href="/contact" className="hover:text-[#B49C5B] transition">Contact</a></li>
      </ul>
    </div>
    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold text-[#B49C5B] mb-4">Contact</h3>
      <ul className="space-y-2 text-gray-400">
        <li>
          <span className="block text-gray-300">Email:</span>
          <a href="mailto:info@kshc.com" className="hover:text-[#B49C5B] transition">info@kshc.com</a>
        </li>
        <li>
          <span className="block text-gray-300">Phone:</span>
          <a href="tel:+249123456789" className="hover:text-[#B49C5B] transition">+249 123 456 789</a>
        </li>
        <li>
          <span className="block text-gray-300">Address:</span>
          <span>123 KSHC Tower, Khartoum, Sudan</span>
        </li>
      </ul>
    </div>
    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold text-[#B49C5B] mb-4">Newsletter</h3>
      <p className="text-gray-400 mb-4">Subscribe to get the latest news and updates from KSHC.</p>
      <form className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-[#B49C5B]"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded bg-[#B49C5B] text-gray-900 font-semibold hover:bg-[#a88a46] transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
  <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
    &copy; 2025 Kuwaiti Sudanese Holding Company (KSHC). All rights reserved.
  </div>
</footer>
    </div>
  );
}

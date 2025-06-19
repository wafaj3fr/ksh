import { getCEOMessage, getInvestmentSectors, getNews, getSettings, getSubsidiaries } from "../sanity/sanity-utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Subsidiaries from "./components/Subsidiaries";
import News from "./components/News";
import CEOMessage from "./components/CEOMessage";
import Sectors from "./components/Sectors";
import { Award, Eye, Globe, Mountain, Target, TrendingUp, Users, Layers } from "lucide-react";
import Image from "next/image";
import WhyUs from "./components/WhyUs";

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
      <WhyUs />
      <News news={news} />
      <CEOMessage message={ceoMessage?.message} imageUrl={ceoMessage?.image?.asset?.url} />
    </div>
  );
}

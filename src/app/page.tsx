import { getCEOMessage, getInvestmentSectors, getNews, getSettings, getSubsidiaries } from "../sanity/sanity-utils";
import Hero from "./components/Hero";
import Subsidiaries from "./components/Subsidiaries";
import News from "./components/News";
import CEOMessage from "./components/CEOMessage";
import Sectors from "./components/Sectors";
import { Award, Eye, Globe, Mountain, Target, TrendingUp, Users, Layers } from "lucide-react";
import WhyUs from "./components/WhyUs";
import AboutTeaser from "./components/AboutTeaser";
import BackToTopButton from "./components/BackToTopButton";
import MissionVision from "./components/MissionVision";
import UnifiedHero from "./components/UnifiedHero";

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
        <AboutTeaser />
        <MissionVision
          vision="To establish the largest economic group with foreign capital contributing to Sudan’s growth."
          mission="Bringing global technologies and business practices to Sudan, aligning the country with global advancements."
          goal="Strengthening Kuwait–Sudan ties, rebuilding post-conflict Sudan, and investing in high-impact sectors."
        />
      </section>

      {/* Objectives */}
      <section id="objectives" className="bg-white pt-48 pb-24 px-6 sm:px-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary mb-2">General Objectives</h2>
          <span className="block mx-auto w-24 h-1 bg-[#B49C5B] rounded mb-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Kuwait–Sudan Ties",
              description: "Introducing a unique model of foreign investment in Sudan.",
              icon: <Globe className="text-primary w-7 h-7 mx-auto" />
            },
            {
              title: "Post-conflict Reconstruction",
              description:
                "Establishing leading profitable institutions that contribute to the development of the community in areas such as technology, services, and industries supporting reconstruction efforts.",
              icon: <Award className="text-primary w-7 h-7 mx-auto" />
            },
            {
              title: "Smart Investments",
              description: "Expanding and supporting effective initiatives through smart partnerships.",
              icon: <TrendingUp className="text-primary w-7 h-7 mx-auto" />
            },
            {
              title: "Talent Development",
              description: "Nurturing exceptional talent and supporting innovative ideas and projects.",
              icon: <Users className="text-primary w-7 h-7 mx-auto" />
            },
            {
              title: "Social Responsibility",
              description: "Focusing on social responsibility and fostering intergenerational connections.",
              icon: <Target className="text-primary w-7 h-7 mx-auto" />
            },
            {
              title: "Smart Partnerships",
              description: "Managing corporate assets efficiently.",
              icon: <Layers className="text-primary w-7 h-7 mx-auto" />
            },
          ].map((obj, idx) => (
            <div
            key={idx}
            // data-aos="fade-up"
            // data-aos-delay={`${idx * 10}`}
            // data-aos-duration="500"
            // data-aos-once="true"
            className="text-center space-y-4 px-4"
          >

              <div className="bg-primary/10 p-4 rounded-full mb-4 flex items-center justify-center w-fit mx-auto">
                {obj.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{obj.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{obj.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="sectors">
      <Sectors sectors={sectors} />
      </section>
      <section id="subsidiaries">
        <Subsidiaries subsidiaries={subsidiaries} />
      </section>
      <section id="why-us">
        <WhyUs />
      </section>
      <section id="news">
        <News news={news} />
      </section>
      <section id="ceo-message">
        <CEOMessage message={ceoMessage?.message} imageUrl={ceoMessage?.image?.asset?.url} />
      </section>
      <BackToTopButton />
    </div>
  );
}

import {
  getCEOMessage,
  getInvestmentSectors,
  getNews,
  getSettings,
  getSubsidiaries,
} from "../../sanity/sanity-utils";

import Subsidiaries from "./components/Subsidiaries";
import News from "./components/News";
import CEOMessage from "./components/CEOMessage";
import Sectors from "./components/Sectors";
import { Award, Globe, Target, TrendingUp, Users, Layers } from "lucide-react";
import WhyUs from "./components/WhyUs";
import AboutTeaser from "./components/AboutTeaser";
import BackToTopButton from "./components/BackToTopButton";
import MissionVision from "./components/MissionVision";
import Hero from "./components/Hero";
import Customers from "./components/Customers";
import Testimonials from "./components/Testimonials";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const [settings, subsidiaries, news, ceoMessage, sectors] = await Promise.all(
    [
      getSettings(),
      getSubsidiaries(),
      getNews(),
      getCEOMessage(),
      getInvestmentSectors(),
    ]
  );

  const t = await getTranslations("objectives");

  return (
    <div className="min-h-screen text-gray-900 font-sans bg-white">
      {/* Hero */}
      <Hero
        heroMediaType={settings.heroMediaType}
        videoSource={settings.videoSource}
        heroImage={settings.heroImage}
        heroVideoFile={settings.heroVideoFile}
        heroVideoUrl={settings.heroVideoUrl}
        heroTitle={settings.heroTitle}
        heroSubtitle={settings.heroSubtitle}
      />

      {/* About Teaser */}
      <section className="py-16 px-6 sm:px-20">
        <div className="max-w-6xl mx-auto">
          <AboutTeaser />
        </div>
      </section>

      {/* Subsidiaries */}
      <section id="subsidiaries" className="py-16 px-6 sm:px-20">
        <div className="max-w-6xl mx-auto">
          <Subsidiaries subsidiaries={subsidiaries} />
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="py-16 px-6 sm:px-20">
        <div className="max-w-12xl mx-auto">
          <Sectors sectors={sectors} />
        </div>
      </section>

      {/* Mission/Vision */}
      <section id="about" className="py-16 px-6 sm:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <MissionVision
            vision="To establish the largest economic group with foreign capital contributing to Sudan's growth."
            mission="Bringing global technologies and business practices to Sudan, aligning the country with global advancements."
            goal="Strengthening Kuwait–Sudan ties, rebuilding post-conflict Sudan, and investing in high-impact sectors."
          />
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-16 px-6 sm:px-20">
        <div className="max-w-6xl mx-auto">
          <WhyUs />
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" className="py-16 px-6 sm:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-primary mb-4">
              {t("title")}
            </h2>
            <span className="block mx-auto w-24 h-1 bg-[#B49C5B] rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t("items.ties.title"),
                description: t("items.ties.description"),
                icon: <Globe className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: t("items.reconstruction.title"),
                description: t("items.reconstruction.description"),
                icon: <Award className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: t("items.investments.title"),
                description: t("items.investments.description"),
                icon: <TrendingUp className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: t("items.talent.title"),
                description: t("items.talent.description"),
                icon: <Users className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: t("items.responsibility.title"),
                description: t("items.responsibility.description"),
                icon: <Target className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: t("items.partnerships.title"),
                description: t("items.partnerships.description"),
                icon: <Layers className="text-primary w-7 h-7 mx-auto" />,
              },
            ].map((obj, idx) => (
              <div
                key={idx}
                className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4 flex items-center justify-center w-fit mx-auto">
                  {obj.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {obj.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customers */}
      <section id="customers" className="py-16 px-6 sm:px-20">
        <div className="max-w-6xl mx-auto">
          <Customers />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 sm:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-16 px-6 sm:px-20">
        <div className="max-w-6xl mx-auto">
          <News news={news} />
        </div>
      </section>

      {/* CEO Message */}
      <section id="ceo-message" className="py-16 px-6 sm:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <CEOMessage
            message={ceoMessage?.message}
            imageUrl={ceoMessage?.image?.asset?.url}
          />
        </div>
      </section>

      <BackToTopButton />
    </div>
  );
}

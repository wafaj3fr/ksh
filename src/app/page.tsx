import { getCEOMessage, getInvestmentSectors, getNews, getSettings, getSubsidiaries } from "../sanity/sanity-utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Subsidiaries from "./components/Subsidiaries";
import News from "./components/News";
import CEOMessage from "./components/CEOMessage";
import Sectors from "./components/Sectors";


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
      <Sectors sectors={sectors} />
      <Subsidiaries subsidiaries={subsidiaries} />
      <News news={news} />
      <CEOMessage message={ceoMessage?.message} imageUrl={ceoMessage?.image?.asset?.url} />
      <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto text-center">
    &copy; 2025 My Company. All rights reserved.
  </div>
</footer>
    </div>
  );
}

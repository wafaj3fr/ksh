import { getCEOMessage, getInvestmentSectors, getMissionVisionGoals, getNews, getSettings, getSubsidiaries } from "../sanity/sanity-utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MissionVision from "./components/MissionVision";
import Subsidiaries from "./components/Subsidiaries";
import News from "./components/News";
import CEOMessage from "./components/CEOMessage";
import Footer from "./components/Footer";
import Sectors from "./components/Sectors";


export default async function Home() {
  const [settings, missionData, subsidiaries, news, ceoMessage, sectors] = await Promise.all([
    getSettings(),
    getMissionVisionGoals(),
    getSubsidiaries(),
    getNews(),
    getCEOMessage(),
    getInvestmentSectors(),
    getInvestmentSectors(),
  ]);

  return (
    <div className="min-h-screen text-gray-900 font-sans bg-[#f5f7fa]">
      <Header logo={settings?.logo} />
      <Hero
        heroImage={settings?.heroImage}
        heroTitle={settings?.heroTitle}
        heroSubtitle={settings?.heroSubtitle}
      />
      <MissionVision mission={missionData?.mission} vision={missionData?.vision} />
      <Sectors sectors={sectors} />
      <Subsidiaries subsidiaries={subsidiaries} />
      <News news={news} />
      <CEOMessage message={ceoMessage?.message} imageUrl={ceoMessage?.image?.asset?.url} />
      <Footer phone={settings?.contactInfo?.phone} email={settings?.contactInfo?.email} />
    </div>
  );
}

// app/news/page.tsx
import { getNews, getSettings } from "../../../sanity/sanity-utils";
import UnifiedHero from "../components/UnifiedHero";
import NewsPageContent from "./NewsPageContent";

export default async function NewsPage() {
  const newsList = await getNews();
  const settings = await getSettings();

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      <UnifiedHero
        title="News & Updates"
        subtitle="Stay informed about the latest developments at KSHC."
        heroMediaType={settings.heroMediaType}
        videoSource={settings.videoSource}
        heroImage={settings.heroImage}
        heroVideoFile={settings.heroVideoFile}
        heroVideoUrl={settings.heroVideoUrl}
        ctaText={settings.ctaText}
        ctaHref={settings.ctaHref}
      />
      <NewsPageContent news={newsList} />
    </main>
  );
}

// app/news/page.tsx
import { getNews, getSettings } from "../../../sanity/sanity-utils";
import UnifiedHero from "../components/UnifiedHero";
import NewsPageContent from "./NewsPageContent";

interface Props {
  params: Promise<{ locale: string }>
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params

  const newsList = await getNews(locale);
  const settings = await getSettings(locale);

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

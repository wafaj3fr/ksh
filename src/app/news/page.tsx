// app/news/page.tsx
import { getNews } from "../../sanity/sanity-utils";
import PageHero from "../components/UnifiedHero";
import NewsPageContent from "./NewsPageContent";

export default async function NewsPage() {
  const newsList = await getNews();

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      <PageHero
        title="News & Updates"
        subtitle="Stay informed about the latest developments at KSHC."
        image="/blue-bg.jpg"
      />
      <NewsPageContent news={newsList} />
    </main>
  );
}

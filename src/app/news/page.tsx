import { CalendarDays, Newspaper, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import PageHero from "../components/PageHero";

// Dummy news data for illustration
const newsList = [
  {
    title: "KSHC Launches New Investment Initiative",
    date: "2025-06-01",
    summary: "The Kuwaiti Sudanese Holding Company announces a new initiative to boost sustainable investment in Sudan’s infrastructure sector.",
    image: "/news1.jpg",
  },
  {
    title: "Strategic Partnership with Global AgriTech",
    date: "2025-05-20",
    summary: "A new partnership will bring advanced agricultural technology and expertise to Sudan, supporting food security and innovation.",
    image: "/news2.jpg",
  },
  {
    title: "KSHC Hosts Annual Economic Forum",
    date: "2025-05-10",
    summary: "Leaders and experts gathered in Khartoum to discuss economic growth, investment opportunities, and regional cooperation.",
    image: "/news3.jpg",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      <PageHero
        title="News & Updates"
        subtitle="Stay informed about the latest developments at KSHC."
      />
      <section className="px-6 sm:px-20 pt-32 pb-20 bg-[#e7ebf0]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary mb-4 text-center">News & Updates</h1>
          <div className="w-24 h-1 bg-[#B49C5B] rounded mb-10 mx-auto" />
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-16">
            Stay up to date with the latest news, announcements, and events from the Kuwaiti Sudanese Holding Company.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {newsList.map((news, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-[#B49C5B] hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Newspaper className="w-6 h-6 text-[#B49C5B]" />
                  <span className="text-primary font-semibold text-base">{news.title}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{new Date(news.date).toLocaleDateString()}</span>
                </div>
                {news.image ? (
                  <div className="w-full h-40 relative rounded-lg overflow-hidden mb-2">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-[#f7f7f7] rounded-lg mb-2">
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  </div>
                )}
                <p className="text-gray-700 text-sm">{news.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
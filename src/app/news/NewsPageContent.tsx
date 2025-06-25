"use client";

import { useState } from "react";
import { CalendarDays, Newspaper } from "lucide-react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import BackToTopButton from "../components/BackToTopButton";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  slug?: { current: string };
  content: any[];
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  gallery?: {
    asset: { url: string };
    alt?: string;
  }[];
}

export default function NewsPageContent({ news }: { news: NewsItem[] }) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
      {/* News Cards Grid */}
      <section className="py-20 px-4 sm:px-8 lg:px-20 bg-[#e7ebf0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-primary mb-4">News & Updates</h1>
            <div className="w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-6" />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Stay up to date with the latest news, announcements, and events from the Kuwaiti Sudanese Holding Company.
            </p>
          </div>
        <BackToTopButton />
          

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedNews(item)}
                className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-[#e3e3e3] p-6 transition-all hover:scale-[1.03]"
              >
                <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                  <Newspaper className="w-5 h-5" />
                  <span className="text-base font-semibold">{item.title}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <CalendarDays className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                {item.mainImage?.asset?.url && (
                  <div className="w-full h-44 relative rounded-lg overflow-hidden mb-3">
                    <Image
                      src={item.mainImage.asset.url}
                      alt={item.mainImage.alt || "News Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-gray-700 text-sm line-clamp-3">
                  {item.content?.[0]?.children?.[0]?.text || ""}
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#B49C5B] hover:underline">
                  Read More →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for News Details */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full relative overflow-y-auto max-h-[90vh] shadow-xl animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            {/* Content */}
            <h2 className="text-2xl font-bold text-primary mb-2">{selectedNews.title}</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(selectedNews.date).toLocaleDateString()}</span>
            </div>

            {selectedNews.mainImage?.asset?.url && (
              <div className="w-full h-72 relative rounded-lg overflow-hidden mb-6">
                <Image
                  src={selectedNews.mainImage.asset.url}
                  alt={selectedNews.mainImage.alt || "News image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose max-w-none prose-sm sm:prose">
              <PortableText value={selectedNews.content} />
            </div>

            {/* Gallery */}
            {selectedNews.gallery?.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-primary mb-4">Gallery</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {selectedNews.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-lg shadow">
                      <Image
                        src={img.asset.url}
                        alt={img.alt || "Gallery Image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

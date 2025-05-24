"use client";

import Image from "next/image";
import { useState } from "react";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
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

interface NewsProps {
  news: NewsItem[];
}

export default function News({ news }: NewsProps) {
  const [current, setCurrent] = useState(0);
  const total = news.length;

  const goTo = (idx: number) => {
    if (idx < 0) setCurrent(total - 1);
    else if (idx >= total) setCurrent(0);
    else setCurrent(idx);
  };

  const item = news[current];

  return (
    <section id="news" className="px-8 sm:px-20 py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-primary">News & Updates</h2>
        <span className="block mx-auto w-60 h-1 rounded bg-[#B49C5B] mb-8" />

        {/* Carousel */}
        <div className="flex flex-col items-center">
          <div className="relative w-full flex justify-center">
            {/* Previous preview */}
            {total > 1 && (
              <div
                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-0 opacity-50 scale-90 transition-all duration-300 cursor-pointer"
                style={{ width: 320 }}
                onClick={() => goTo((current - 1 + total) % total)}
              >
                <NewsCard item={news[(current - 1 + total) % total]} faded />
              </div>
            )}
            {/* Main card */}
            <div
              className="z-10 w-full sm:w-auto cursor-pointer"
              onClick={() => goTo((current + 1) % total)}
            >
              <NewsCard item={item} />
            </div>
            {/* Next preview */}
            {total > 1 && (
              <div
                className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-50 scale-90 transition-all duration-300 cursor-pointer"
                style={{ width: 320 }}
                onClick={() => goTo((current + 1) % total)}
              >
                <NewsCard item={news[(current + 1) % total]} faded />
              </div>
            )}
          </div>
          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => goTo(current - 1)}
              className="px-4 py-2 rounded-full bg-[#B49C5B] text-white font-bold hover:bg-[#a88a46] transition"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <div className="flex gap-2">
              {news.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-3 h-3 rounded-full ${current === idx ? "bg-[#B49C5B]" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo(current + 1)}
              className="px-4 py-2 rounded-full bg-[#B49C5B] text-white font-bold hover:bg-[#a88a46] transition"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item, faded = false }: { item: NewsItem; faded?: boolean }) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow p-4 sm:p-6 text-left transition-all duration-300
        flex-1 flex flex-col
        ${faded ? "opacity-60 scale-95" : "opacity-100 scale-105 border-2 border-[#B49C5B]"}
      `}
      style={{
        minWidth: 0,
        maxWidth: 400,
      }}
    >
      <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
      <span className="block w-12 h-1 rounded bg-[#B49C5B] mb-3" />
      <p className="text-gray-600 text-sm mb-2">
        {new Date(item.date).toLocaleDateString()}
      </p>
      {item.mainImage?.asset.url && (
        <div className="mb-4">
          <Image
            src={item.mainImage.asset.url}
            alt={item.mainImage.alt || "News Image"}
            width={400}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {item.content[0]?.children[0]?.text || ""}
      </p>
      {item.gallery?.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {item.gallery.map((img, gidx) => (
            <Image
              key={gidx}
              src={img.asset.url}
              alt={img.alt || "Gallery Image"}
              width={200}
              height={150}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
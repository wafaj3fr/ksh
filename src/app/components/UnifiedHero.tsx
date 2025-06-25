// src/app/components/UnifiedHero.tsx
"use client";
import Image from "next/image";

interface UnifiedHeroProps {
  title: string;
  subtitle?: string;
  heroMediaType?: string;
  videoSource?: string;
  heroImage?: { asset: { url: string }; alt?: string };
  heroVideoFile?: { asset: { url: string } };
  heroVideoUrl?: string;
  height?: string; // "full" or "medium"
}

export default function UnifiedHero({
  title,
  subtitle,
  heroMediaType,
  videoSource,
  heroImage,
  heroVideoFile,
  heroVideoUrl,
  height = "medium",
}: UnifiedHeroProps) {
  const heightClass = height === "full" ? "h-[100vh] min-h-[600px]" : "h-[300px] sm:h-[500px]";

  return (
    <section className={`relative w-full ${heightClass} flex items-center justify-center text-center text-white overflow-hidden`}>
      {/* Background media */}
      {heroMediaType === "video" ? (
        videoSource === "file" && heroVideoFile?.asset?.url ? (
          <video
            src={heroVideoFile.asset.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : videoSource === "url" && heroVideoUrl ? (
          <iframe
            src={heroVideoUrl}
            title="Hero Video"
            allow="autoplay; fullscreen"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )
      ) : heroImage?.asset?.url ? (
        <Image
          src={heroImage.asset.url}
          alt={heroImage.alt || "Hero Image"}
          fill
          className="object-cover z-0"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gray-700 z-0" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text */}
      <div className="relative z-20 px-4 sm:px-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
        {subtitle && <p className="text-lg sm:text-xl text-[#B49C5B] font-medium">{subtitle}</p>}
      </div>
    </section>
  );
}

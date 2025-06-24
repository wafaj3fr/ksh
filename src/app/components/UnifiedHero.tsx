import Image from "next/image";

interface UnifiedHeroProps {
  title: string;
  subtitle?: string;
  heroMediaType?: "video" | "image";
  videoSource?: "file" | "url";
  heroImage?: { asset: { url: string }; alt?: string };
  heroVideoFile?: { asset: { url: string } };
  heroVideoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  height?: "full" | "medium"; // default: full
}

export default function UnifiedHero({
  title,
  subtitle,
  heroMediaType = "image",
  videoSource,
  heroImage,
  heroVideoFile,
  heroVideoUrl,
  ctaText,
  ctaHref,
  height = "full",
}: UnifiedHeroProps) {
  const sectionHeight =
    height === "medium" ? "h-[300px] sm:h-[500px]" : "h-[100vh] min-h-[600px]";

  return (
    <section
      className={`relative w-full ${sectionHeight} flex items-center justify-center text-center text-white overflow-hidden`}
    >
      {/* Background Media */}
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
          <div className="absolute inset-0 bg-black z-0" />
        )
      ) : heroImage?.asset?.url ? (
        <Image
          src={heroImage.asset.url}
          alt={heroImage.alt || "Hero Background"}
          fill
          className="object-cover z-0"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] to-[#1e293b] z-0" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Text + CTA */}
      <div className="relative z-20 px-6 sm:px-20">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{title}</h1>
        {subtitle && (
          <p className="text-[#B49C5B] text-lg sm:text-xl max-w-2xl mx-auto drop-shadow-md">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <div className="mt-6">
            <a
              href={ctaHref}
              className="inline-block bg-[#B49C5B] text-gray-800 py-3 px-6 rounded-full hover:bg-[#a4884a] hover:text-white transition"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

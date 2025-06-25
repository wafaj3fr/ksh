import Image from "next/image";

interface HeroProps {
  heroMediaType?: string;
  videoSource?: string;
  heroImage?: { asset: { url: string }; alt?: string };
  heroVideoFile?: { asset: { url: string } };
  heroVideoUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
}

export default function Hero({
  heroMediaType,
  videoSource,
  heroImage,
  heroVideoFile,
  heroVideoUrl,
  heroTitle,
  heroSubtitle,
}: HeroProps) {
  return (
    <section className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
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
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 px-6 sm:px-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">{heroTitle}</h1>
        <p className="text-lg text-[#B49C5B] sm:text-2xl max-w-2xl mx-auto">{heroSubtitle}</p>
        <div className="mt-8">
          <a
            href="#contact"
            className="bg-[#B49C5B] text-gray-800 py-3 px-6 rounded-full hover:bg-[#a4884a] hover:text-white transition"
            >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

interface HeroProps {
  heroImage?: { asset: { url: string }; alt?: string };
  heroVideoFile?: { asset: { url: string } };
  heroVideoUrl?: string;
  heroMediaType?: "image" | "video";
  videoSource?: "url" | "file";
  heroTitle: string;
  heroSubtitle: string;
}

export default function Hero({
  heroImage,
  heroVideoFile,
  heroVideoUrl,
  heroMediaType = "image",
  videoSource = "file",
  heroTitle,
  heroSubtitle,
}: HeroProps) {
  const isVideo = heroMediaType === "video";
  const isEmbed = videoSource === "url";
  const isFile = videoSource === "file";

  return (
    <section className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center">
      {/* Media Layer */}
      {isVideo ? (
        isEmbed && heroVideoUrl ? (
          <iframe
            src={heroVideoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : heroVideoFile?.asset.url ? (
          <video
            src={heroVideoFile.asset.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <p className="text-white">No Video Available</p>
          </div>
        )
      ) : heroImage?.asset.url ? (
        <Image
          src={heroImage.asset.url}
          alt={heroImage.alt || "Hero Image"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <p>No Image Available</p>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-10">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">{heroTitle}</h1>
        <p className="text-lg text-[#B49C5B] sm:text-2xl max-w-2xl mx-auto">{heroSubtitle}</p>
        <div className="mt-8">
          <a
            href="#contact"
            className="border border-[#B49C5B] text-white py-3 px-6 rounded-full hover:bg-[#B49C5B] hover:text-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

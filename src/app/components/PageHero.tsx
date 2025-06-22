import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  
}

export default function PageHero({ title, subtitle, image, imageAlt, videoSrc }: PageHeroProps) {
  return (
    <section className="relative h-[300px] sm:h-[500px] overflow-hidden text-white font-sans">
      {/* Background Image or Gradient */}
      {image ? (
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          // className="object-cover opacity-30"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] to-[#1e293b] opacity-20" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-0" />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-10">
        <h1 className="text-white text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#B49C5B] text-base sm:text-xl font-medium mt-4 max-w-2xl drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

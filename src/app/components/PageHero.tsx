// components/PageHero.tsx
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative h-[300px] sm:h-[400px] bg-[#0f172a] overflow-hidden">
      {/* Background Illustration */}
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] to-[#1e293b] opacity-80" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end items-center h-full text-center px-6 sm:px-10 pb-12">
        <h1 className="text-white text-3xl sm:text-5xl font-extrabold drop-shadow">{title}</h1>
        {subtitle && (
          <p className="text-gray-200 text-sm sm:text-lg mt-3 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

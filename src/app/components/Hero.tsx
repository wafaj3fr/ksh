import Image from "next/image";
interface HeroProps {
  heroImage?: { asset: { url: string }; alt?: string }; 
  heroTitle: string;
  heroSubtitle: string;
}

export default function Hero({ heroImage, heroTitle, heroSubtitle }: HeroProps) {
  return (
    <section
      id="home"
      className="text-center px-8 sm:px-20 py-40 min-h-[600px] bg-[url('/banner.png')] bg-cover bg-center"
    >
       {heroImage?.asset.url ? (
        <Image
          src={heroImage.asset.url}
          alt={heroImage.alt || "Hero Image"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="bg-gray-700 h-full flex items-center justify-center">
          <p>No Image Available</p>
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">{heroTitle}</h1>
        <p className="text-lg sm:text-2xl">{heroSubtitle}</p>
        <div className="mt-8">
          <a
            href="#contact"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

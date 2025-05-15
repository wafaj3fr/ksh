interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section
      id="home"
      className="text-center px-8 sm:px-20 py-40 min-h-[600px] bg-[url('/banner.png')] bg-cover bg-center"
    >
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-primary leading-tight text-white">
        {title}
      </h1>
      <p className="text-xl text-gray-100 max-w-3xl mx-auto">{subtitle}</p>
    </section>
  );
}

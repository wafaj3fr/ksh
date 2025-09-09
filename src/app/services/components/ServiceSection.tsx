import Image from "next/image";
import Link from "next/link";

type Card = { title: string; desc: string; image: string };

export default function ServiceSection({
  heading,
  subtext,
  cards,
  cta,
  logo,
  bgColor = "#ffffff",
  accentColor = "#B49C5B",
  textColor = "#374151",
}: {
  heading: string;
  subtext?: string;
  cards: Card[];
  cta?: { label: string; href: string };
  logo?: string;
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
}) {
  const isColored = bgColor !== "#ffffff" && bgColor !== "white";

  return (
    <section
      className="px-6 sm:px-20 py-24"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h3
              className="text-3xl font-extrabold mb-2"
              style={{ color: textColor }}
            >
              {heading}
            </h3>
            <p
              className="max-w-2xl"
              style={{ color: isColored ? `${textColor}cc` : "#6B7280" }}
            >
              {subtext}
            </p>
          </div>

          {logo ? (
            <div className="flex-shrink-0">
              <Image
                src={logo}
                alt={heading}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          ) : null}
        </div>

        {/* Cards */}
        {cards.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-72 rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105 shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 brightness-75 group-hover:brightness-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/40 group-hover:bg-black/20 transition rounded-xl">
                  <h4
                    className="text-xl font-bold underline underline-offset-4 drop-shadow-md mb-1"
                    style={{
                      color: accentColor,
                      textDecorationColor: accentColor,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {cta && (
          <div className="text-center mt-10">
            {isColored ? (
              <Link
                href={cta.href}
                className="inline-block px-6 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
                style={{
                  backgroundColor: accentColor,
                  color: bgColor,
                }}
              >
                {cta.label}
              </Link>
            ) : (
              <Link
                href={cta.href}
                className="font-semibold underline"
                style={{ color: accentColor }}
              >
                {cta.label} →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

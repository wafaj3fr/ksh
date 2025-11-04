import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Card = {
  title: string;
  desc: string;
  image: string;
};

type SubsidiarySectionProps = {
  title: string;
  subtitle: string;
  logo: string;
  bgColor?: string; // hex or tailwind class
  cards: Card[];
  cta?: { label: string; href: string };
};

const QAST_ACCENT = "#AC2E5D";
const QAST_BG_DARK = "#020202";
const QAST_WHITE = "#FFFFFF";

export default function SubsidiarySection({
  title,
  subtitle,
  logo,
  bgColor = QAST_BG_DARK,
  cards,
  cta,
}: SubsidiarySectionProps) {
  const sectionBg = bgColor;

  return (
    <section
      className="px-6 sm:px-20 py-24"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
          <div>
            <h2
              className="text-3xl font-extrabold mb-2"
              style={{ color: QAST_WHITE }}
            >
              {title}
            </h2>
            <p className="max-w-2xl" style={{ color: `${QAST_WHITE}cc` }}>
              {subtitle}
            </p>
          </div>

          <Image
            src={logo}
            alt={title}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative h-80 rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105 shadow-lg"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-all duration-700 brightness-75 group-hover:brightness-100"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/40 group-hover:bg-black/20 transition rounded-xl">
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: QAST_ACCENT }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{ color: QAST_WHITE }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {cta && (
          <div className="text-center mt-10">
            <Link
              href={cta.href}
              className="inline-block px-6 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition"
              style={{
                backgroundColor: QAST_ACCENT,
                color: QAST_WHITE,
              }}
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

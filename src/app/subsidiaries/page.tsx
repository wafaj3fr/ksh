import { Building2, Globe2, Users, Banknote } from "lucide-react";
import { getSettings } from "../../sanity/sanity-utils";
import UnifiedHero from "../components/UnifiedHero";
import BackToTopButton from "../components/BackToTopButton";
import QASTSection from "../components/qastSection";
import TADSection from "../components/tadSection";
import CubesSection from "../components/cubesSection";
import QSCSection from "../components/qscSection";


const subsidiaries = [
  {
    id: "qast",
    name: "QAST",
    desc: "Network services & Information Technology Management Company.",
    icon: <Globe2 className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Technology",
  },
  {
    id: "tad",
    name: "TAD",
    desc: "Facility Management Services & Integrated Solutions Company.",
    icon: <Building2 className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Facility Management",
  },
  {
    id: "cubes",
    name: "Cubes",
    desc: "Construction & Real Estate Company.",
    icon: <Users className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Construction",
  },
  {
    id: "qsc",
    name: "Quality for Supply Chains",
    desc: "Supply Chains Management Services Company.",
    icon: <Banknote className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Supply Chains",
  },
];

export default async function SubsidiariesPage() {
  const settings = await getSettings();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#f7f9fc] to-[#e7ebf0] text-gray-900 font-sans">
      {/* Hero */}
      <UnifiedHero
        title="Our Subsidiaries"
        subtitle="Explore the diverse companies under the Kuwaiti Sudanese Holding Company, each contributing to Sudan's growth and development."
        heroMediaType={settings.heroMediaType}
        videoSource={settings.videoSource}
        heroImage={settings.heroImage}
        heroVideoFile={settings.heroVideoFile}
        heroVideoUrl={settings.heroVideoUrl}
      />

      {/* Cards Overview */}
      <section className="px-6 sm:px-20 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Our Subsidiaries</h1>
          <div className="w-24 h-1 bg-[#B49C5B] rounded mb-8 mx-auto" />
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-16">
            Each of our subsidiaries is a leader in its field, working together to build a stronger, more innovative Sudan. Explore our group companies and their unique contributions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {subsidiaries.map((sub, i) => (
              <a
                key={i}
                href={`#${sub.id}`}
                className="relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#B49C5B] hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="absolute -top-4 right-6 bg-[#B49C5B]/90 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide">
                  {sub.tag}
                </div>
                <div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
                  {sub.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 group-hover:underline">{sub.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{sub.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Company Sections */}
      <section id="qast">
        <QASTSection />
      </section>
      <section id="tad">
        <TADSection />
      </section>
      <section id="cubes">
        <CubesSection />
      </section>
      <section id="qsc">
        <QSCSection />
      </section>

      {/* Back to Top */}
      <BackToTopButton />
    </main>
  );
}

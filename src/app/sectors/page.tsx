import { Building, Leaf, HeartPulse, Banknote, Globe2, Wrench } from "lucide-react";
import Header from "../components/Header";

const sectors = [
  {
    title: "Real Estate",
    desc: "Investing in commercial, residential, and infrastructure projects that shape Sudan’s urban future.",
    icon: <Building className="w-10 h-10 text-[#B49C5B]" />,
  },
  {
    title: "Agriculture",
    desc: "Supporting sustainable agriculture and food security through modern farming and agri-tech.",
    icon: <Leaf className="w-10 h-10 text-[#B49C5B]" />,
  },
  {
    title: "Healthcare",
    desc: "Enhancing healthcare services and facilities to improve quality of life across Sudan.",
    icon: <HeartPulse className="w-10 h-10 text-[#B49C5B]" />,
  },
  {
    title: "Finance",
    desc: "Driving economic growth by investing in banking, fintech, and financial services.",
    icon: <Banknote className="w-10 h-10 text-[#B49C5B]" />,
  },
  {
    title: "Trade & Logistics",
    desc: "Facilitating trade and logistics to connect Sudan with regional and global markets.",
    icon: <Globe2 className="w-10 h-10 text-[#B49C5B]" />,
  },
  {
    title: "Industry",
    desc: "Developing industrial projects that create jobs and foster innovation.",
    icon: <Wrench className="w-10 h-10 text-[#B49C5B]" />,
  },
];

export default function SectorsPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      <Header />
      <section className="px-6 sm:px-20 pt-32 pb-20 bg-[#e7ebf0]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary mb-4 text-center">Our Investment Sectors</h1>
          <div className="w-24 h-1 bg-[#B49C5B] rounded mb-10 mx-auto" />
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center mb-16">
            We invest in sectors that drive Sudan’s growth and prosperity, focusing on sustainable development, innovation, and long-term value for our partners and communities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sectors.map((sector, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-8 text-center border border-[#B49C5B] flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
                  {sector.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{sector.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
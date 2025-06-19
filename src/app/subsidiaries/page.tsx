import { Building2, Briefcase, Globe2, Users, Banknote, Leaf } from "lucide-react";

const subsidiaries = [
  {
    name: "Sudan Real Estate Co.",
    desc: "Leading real estate development and management across Sudan’s urban centers.",
    icon: <Building2 className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Real Estate",
  },
  {
    name: "AgriSudan",
    desc: "Modernizing agriculture and supporting food security through innovation.",
    icon: <Leaf className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Agriculture",
  },
  {
    name: "Sudan Health Group",
    desc: "Delivering quality healthcare services and medical infrastructure.",
    icon: <Users className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Healthcare",
  },
  {
    name: "Kuwait Sudan Finance",
    desc: "Empowering economic growth with banking and financial solutions.",
    icon: <Banknote className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Finance",
  },
  {
    name: "Global Logistics Sudan",
    desc: "Connecting Sudan to the world with advanced logistics and trade services.",
    icon: <Globe2 className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Logistics",
  },
  {
    name: "Sudan Industry Holdings",
    desc: "Driving industrial innovation and job creation in key sectors.",
    icon: <Briefcase className="w-10 h-10 text-[#B49C5B]" />,
    tag: "Industry",
  },
];

export default function SubsidiariesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#f7f9fc] to-[#e7ebf0] text-gray-900 font-sans">
      <section className="px-6 sm:px-20 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary mb-2 text-center">Our Subsidiaries</h1>
          <div className="w-24 h-1 bg-[#B49C5B] rounded mb-8 mx-auto" />
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto text-center mb-16">
            Each of our subsidiaries is a leader in its field, working together to build a stronger, more innovative Sudan. Explore our group companies and their unique contributions.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {subsidiaries.map((sub, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl shadow-xl p-8 w-full sm:w-[320px] flex flex-col items-center border border-[#B49C5B] hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute -top-4 right-6 bg-[#B49C5B]/90 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide">
                  {sub.tag}
                </div>
                <div className="bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center">
                  {sub.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{sub.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
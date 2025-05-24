export default function WhyUs() {
  return (
    <section className="py-28 px-6 sm:px-20 bg-gradient-to-br from-[#f5f9ff] via-white to-[#edf2f7]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight mb-4">
            Why Us?
          </h2>
          <div className="w-24 h-1 bg-[#B49C5B] rounded mb-6 sm:mb-10" />
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            We follow a strategic and credible investment methodology to build a sustainable and impactful legacy. Our projects are guided by innovation, long-term vision, and a commitment to client trust and partnership excellence.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4 max-w-5xl">
            Our diverse investments and projects are based on credibility, excellence, and continuous innovation. We provide comprehensive and advanced services to our clients and partners, earning their respect and trust for the long term.
          </p>
        </div>
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          <StatCard
            value="20+"
            label="Years of Experience"
            icon={
              <svg className="w-10 h-10 text-[#B49C5B]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <StatCard
            value="15"
            label="Subsidiaries"
            icon={
              <svg className="w-10 h-10 text-[#B49C5B]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="2" />
                <rect x="14" y="3" width="7" height="7" rx="2" />
                <rect x="14" y="14" width="7" height="7" rx="2" />
                <rect x="3" y="14" width="7" height="7" rx="2" />
              </svg>
            }
          />
          <StatCard
            value="$500M+"
            label="Invested Capital"
            icon={
              <svg className="w-10 h-10 text-[#B49C5B]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3zm0 0V4m0 12v4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-[#f3e9d1]">
      <div className="mb-4 bg-[#f7f3e6] rounded-full p-4 flex items-center justify-center group-hover:bg-[#B49C5B]/10 transition">
        {icon}
      </div>
      <span className="text-5xl font-extrabold text-[#B49C5B] mb-2 group-hover:text-[#a88a46] transition">{value}</span>
      <span className="text-gray-700 font-semibold text-lg text-center">{label}</span>
    </div>
  );
}
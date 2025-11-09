import Image from "next/image";

interface Subsidiary {
  _id: string;
  name: string;
  description: string;
  logo?: { asset: { url: string } };
  website?: string;
}

interface SubsidiariesProps {
  subsidiaries: Subsidiary[];
}

export default function Subsidiaries({ subsidiaries }: SubsidiariesProps) {
  // Only show section if there are subsidiaries to display
  if (!subsidiaries || subsidiaries.length === 0) {
    return null;
  }

  return (
    <section id="subsidiaries" className="px-8 sm:px-20 py-20 bg-white">
      <h2 className="text-3xl font-bold mb-2 text-center text-primary">KSHC Subsidiaries</h2>
      <span className="block mx-auto w-70 h-1 rounded bg-[#B49C5B] mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subsidiaries.map((sub) => (
          <div
            key={sub._id}
            className="group bg-[#f9fafb] p-6 rounded-xl shadow transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-[#B49C5B]"
          >
            {sub.logo?.asset?.url && (
              <div className="w-full h-40 mb-4 relative">
                <Image
                  src={sub.logo.asset.url}
                  alt={sub.name}
                  fill
                  className="rounded-lg object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#B49C5B] transition-colors">
              {sub.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{sub.description}</p>

            <a
  href={sub.website || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1 mt-auto text-sm font-medium text-[#B49C5B] border border-[#B49C5B] px-4 py-1.5 rounded hover:bg-[#B49C5B] hover:text-white transition"
>
  Visit Website
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h6m0 0v6m0-6L10 19"
    />
  </svg>
</a>

          </div>
        ))}
      </div>
    </section>
  );
}

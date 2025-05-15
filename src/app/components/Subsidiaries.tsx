import Image from "next/image";

interface Subsidiary {
  _id: string;
  name: string;
  description: string;
  logo?: { asset: { url: string } };
  link?: string;
}

interface SubsidiariesProps {
  subsidiaries: Subsidiary[];
}

export default function Subsidiaries({ subsidiaries }: SubsidiariesProps) {
  return (
    <section id="subsidiaries" className="px-8 sm:px-20 py-20 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">KSHC Subsidiaries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subsidiaries.map((sub) => (
          <a key={sub._id} href={sub.link || "#"} target="_blank" rel="noreferrer" className="bg-[#f9fafb] p-6 rounded-xl shadow hover:shadow-md transition-all block">
            {sub.logo?.asset?.url && (
              <Image
                src={sub.logo.asset.url}
                alt={sub.name}
                width={400}
                height={300}
                className="rounded-lg mb-4 object-cover w-full h-40"
              />
            )}
            <h3 className="text-lg font-bold text-gray-900 mb-1">{sub.name}</h3>
            <p className="text-sm text-gray-600">{sub.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

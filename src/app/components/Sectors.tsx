'use client';

import Image from "next/image";
import {
  Wifi,
  Building,
  Hammer,
  Truck,
  Globe,
  Target,
  Layers,
  Users,
  TrendingUp
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Building,
  Hammer,
  Truck,
  Globe,
  Target,
  Layers,
  Users,
  TrendingUp
};


export interface InvestmentSectorProps {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
}

export default function Sectors({ sectors }: { sectors: InvestmentSectorProps[] }) {
  return (
    <section id="sectors" className="px-8 sm:px-20 py-24 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">Key Investment Sectors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {sectors.map((sector) => (
            <div key={sector._id} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
              <div className="flex items-center gap-4 mb-3">
                {sector.icon?.startsWith('http') ? (
                  <Image src={sector.icon} alt={sector.title} width={40} height={40} />
                ) : (
                  <span className="text-2xl text-gray-700">{sector.icon}</span> // fallback
                )}
                <h3 className="text-xl font-semibold text-gray-800">{sector.title}</h3>
              </div>
              <p className="text-gray-700 text-sm">{sector.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from "next/image";
import * as LucideIcons from "lucide-react";

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
          {sectors.map((sector) => {
            // Try to get the Lucide icon component by name
            const LucideIcon = sector.icon && (LucideIcons as any)[sector.icon];
            return (
              <div key={sector._id} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
                <div className="flex items-center gap-4 mb-3">
                  {LucideIcon ? (
                    <LucideIcon size={40} className="text-gray-700" />
                  ) : sector.icon?.startsWith('http') ? (
                    <Image src={sector.icon} alt={sector.title} width={40} height={40} />
                  ) : (
                    <span className="text-2xl text-gray-700">{sector.icon}</span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-800">{sector.title}</h3>
                </div>
                <p className="text-gray-700 text-sm">{sector.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

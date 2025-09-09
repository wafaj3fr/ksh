'use client';

import { iconMap } from "../../utils/icons";

export interface InvestmentSectorProps {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
}

export default function Sectors({ sectors }: { sectors: InvestmentSectorProps[] }) {
  return (
    <section id="sectors" className="px-8 sm:px-20 py-24 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl font-bold mb-2 text-primary">Key Investment Sectors</h2>
        <span className="block mx-auto w-85 h-1 rounded bg-[#B49C5B] mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon && iconMap[sector.icon];

            return (
              <div
                key={index}
                className="bg-gray-900 text-white p-6 rounded-xl shadow border border-[#B49C5B] transition-transform duration-300 transform hover:scale-110 hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-3">
                  {IconComponent ? (
                    <IconComponent className="text-[#B49C5B] w-6 h-6" />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  )}
                  <h3 className="text-xl font-semibold text-white">{sector.title}</h3>
                </div>
                <p className="text-white">{sector.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

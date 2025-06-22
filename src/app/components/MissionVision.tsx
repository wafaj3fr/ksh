import { Eye, Mountain } from "lucide-react";

interface MissionVisionProps {
  mission?: string;
  vision?: string;
}

export default function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <section
      id="mission-vision"
      className="bg-[#f5f7fa] py-24 px-6 sm:px-20 text-gray-900"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-12">
          Our Vision & Mission
        </h2>

        <div className="grid sm:grid-cols-2 gap-10 text-left">
          {/* Vision Card */}
          <div className="group bg-white rounded-2xl border border-[#B49C5B] shadow-md p-8 
  transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-[#B49C5B]/20 transition">
                <Eye size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-md">
              {vision}
            </p>
          </div>

          {/* Mission Card */}
          <div className="group bg-white rounded-2xl border border-[#B49C5B] shadow-md p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-[#B49C5B]/20 transition">
                <Mountain size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-md">
              {mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

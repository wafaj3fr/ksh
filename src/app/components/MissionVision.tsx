interface MissionVisionProps {
  mission?: string;
  vision?: string;
}

export default function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <section id="about" className="px-8 sm:px-20 py-24 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
            <div className="flex items-center gap-4 mb-3">
              {/* Replace with icon as needed */}
              <svg className="text-gray-600" width="28" height="28" fill="currentColor" />
              <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-700">{vision}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-left">
            <div className="flex items-center gap-4 mb-3">
              {/* Replace with icon as needed */}
              <svg className="text-gray-600" width="28" height="28" fill="currentColor" />
              <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-700">{mission}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BusinessUnits() {
  const units = [
    { name:'KSHC', desc:'—' },
    { name:'Q Supply Chain', desc:'Logistics, procurement, and supply services' },
    { name:'Cubes Construction & Real Estate', desc:'Infrastructure, construction, and property development' },
  ];
  return (
    <div className="py-10">
      <p className="mx-auto max-w-3xl text-center text-white/85 text-lg">
        We are always on the lookout for passionate, skilled, and motivated individuals to join our growing team across our three business units:
      </p>
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {units.map((u) => (
          <div
            key={u.name}
            className="mx-auto w-full max-w-xs rounded-2xl border border-white/10 bg-[#0f1419] p-6 flex flex-col items-center shadow-[0_6px_24px_-10px_rgba(0,0,0,.4)]"
            style={{ height: 420 }}
          >
            {/* logo - circular and at top */}
            <div className="h-28 w-28 rounded-full bg-white/5 flex items-center justify-center mb-6" />

            {/* content centered and allowed to grow */}
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <h4 className="font-semibold text-white text-lg">{u.name}</h4>
              <p className="mt-3 text-sm text-white/70">{u.desc}</p>
            </div>

            {/* optional action area (keeps footer space) */}
            <div className="mt-6 w-full flex justify-center">
              {/* placeholder for button or badge */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

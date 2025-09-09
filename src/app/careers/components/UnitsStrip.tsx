'use client';

import Image from 'next/image';

type Unit = {
  title?: string;
  subtitle?: string;
  description?: string;
  logoUrl?: string | null;
  logo?: { asset?: { url?: string } } | null;
};

export default function UnitsStrip({
  heading = 'Our Business Units',
  subtext,
  units,
}: {
  heading?: string;
  subtext?: string;
  units?: Unit[];
}) {
  if (!units || units.length === 0) return null;

  return (
    <section className="bg-[#e9eff5] py-16 px-6 sm:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-[#0a1f44]">{heading}</h2>
          <span className="mt-3 inline-block h-1 w-24 rounded bg-[#B49C5B]" />
          {subtext ? (
            <p className="mt-4 text-sm text-[#586270]">{subtext}</p>
          ) : null}
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {units.map((u, i) => {
            const src = u.logoUrl || u.logo?.asset?.url || '';

            return (
              <div
                key={i}
                className="mx-auto w-full max-w-sm rounded-2xl border border-[#d8c99b] bg-white p-6 flex flex-col items-center shadow-[0_8px_24px_rgba(10,31,68,0.08)]"
              >
                {/* larger circular logo on top */}
                <div className="mb-3 -mt-6 flex items-center justify-center">
                  {src ? (
                    <Image
                      src={src}
                      alt={u.title || 'Unit logo'}
                      width={144}
                      height={144}
                      className="h-36 w-36 rounded-full object-contain"
                    />
                  ) : (
                    <div className="h-36 w-36 rounded-full bg-[#f1f4f8] ring-1 ring-[#d8c99b]" />
                  )}
                </div>

                {/* content: keep compact and avoid large empty space */}
                <div className="w-full flex-1 flex flex-col justify-start items-center text-center px-4">
                  {u.title ? (
                    <h3 className="text-lg font-extrabold tracking-wide text-[#0a1f44]">
                      {u.title}
                    </h3>
                  ) : null}
                  {u.subtitle ? (
                    <p className="mt-2 text-sm text-[#586270]">{u.subtitle}</p>
                  ) : null}
                  {u.description ? (
                    <p className="mt-3 text-sm text-[#586270] line-clamp-4">{u.description}</p>
                  ) : (
                    <p className="mt-3 text-sm text-[#9aa0a6]">Short overview coming soon.</p>
                  )}
                </div>

                {/* CTA area (small, ensures card doesn't feel empty) */}
                <div className="mt-4 w-full flex justify-center">
                  <button
                    type="button"
                    className="rounded-full px-4 py-2 text-sm font-medium bg-[#B49C5B] text-white hover:bg-[#a88a46] transition"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

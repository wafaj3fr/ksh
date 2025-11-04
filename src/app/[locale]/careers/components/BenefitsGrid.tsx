"use client";

import { iconMap } from "../../../../utils/icons";

type BenefitItem = { text: string; iconKey?: string };

// خليها تقبل إما string أو BenefitItem (توافق للخلف)
type Props = {
  heading?: string;
  subtext?: string;
  items?: Array<string | BenefitItem>;
};

export default function BenefitsGrid({ heading, subtext, items }: Props) {
  const normalized: BenefitItem[] = (items ?? []).map((it) =>
    typeof it === "string" ? { text: it } : it
  );

  return (
    <div className="py-16 text-center">
      {heading && (
        <h2 className="text-2xl font-extrabold text-[#0a1f44] underline underline-offset-8 decoration-[#B49C5B]">
          {heading}
        </h2>
      )}
      {subtext && <p className="mt-2 text-sm text-[#586270]">{subtext}</p>}

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {normalized.map((item, i) => {
          const Icon = item.iconKey ? iconMap[item.iconKey] : undefined;
          return (
            <div
              key={`${item.text}-${i}`}
              className="flex items-center gap-3 rounded-2xl border border-[#E6D9B3] bg-white px-5 py-4 text-left shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EAD3]">
                {Icon ? (
                  <Icon className="h-5 w-5 text-[#B49C5B]" />
                ) : (
                  <span className="h-5 w-5" />
                )}
              </div>
              <span className="font-semibold text-[#0a1f44]">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

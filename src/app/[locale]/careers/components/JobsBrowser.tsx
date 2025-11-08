"use client";

import { useMemo, useState } from "react";
import JobCard from "./JobCard";

type Job = {
  _id: string;
  id?: string;
  title: string;
  category?: string;
  department?: string;
  location?: string;
  type?: string;
  deadline?: string;
  slug?: string | { current: string };
};

type Props = {
  jobs?: Job[];
  categories?: string[]; // اختياري: لو عايز تفرض ترتيب/مسميات معيّنة
  pageSize?: number; // اختياري: للعرض التدريجي
};

export default function JobsBrowser({ jobs, categories, pageSize = 9 }: Props) {
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  // استخرج التصنيفات ديناميكيًا من البيانات (case-insensitive + تخلص من القيم الفارغة)
  const autoCats = useMemo(() => {
    const set = new Set<string>();
    for (const j of safeJobs) {
      const raw = (j?.category ?? "").toString().trim();
      if (raw) set.add(capitalize(raw));
    }
    return Array.from(set);
  }, [safeJobs]);

  // لو المستخدم مرّر categories نستخدمها (مع الحفاظ على All بالأول)، وإلا نستخدم المستخرجة
  const cats = useMemo(() => {
    const base =
      Array.isArray(categories) && categories.length ? categories : autoCats;
    return base[0] === "All" ? base : ["All", ...base];
  }, [categories, autoCats]);

  const [active, setActive] = useState<string>("All");
  const [visible, setVisible] = useState<number>(pageSize);

  // عدّاد لكل تبويب (يساعد تجربة المستخدم)
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: safeJobs.length };
    for (const c of cats) {
      if (c === "All") continue;
      const key = c.toLowerCase();
      map[c] = safeJobs.filter(
        (j) => (j.category ?? "").toString().toLowerCase() === key
      ).length;
    }
    return map;
  }, [cats, safeJobs]);

  // فلترة حسب التبويب (case-insensitive)
  const filtered = useMemo(() => {
    if (active === "All") return safeJobs;
    const key = active.toLowerCase();
    return safeJobs.filter(
      (j) => (j.category ?? "").toString().toLowerCase() === key
    );
  }, [active, safeJobs]);

  const sliced = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  const onTab = (t: string) => {
    setActive(t);
    setVisible(pageSize);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
        {cats.map((t) => {
          const isActive = active === t;
          return (
            <button
              key={t}
              onClick={() => onTab(t)}
              className={`rounded-full px-3 py-1.5 text-sm transition
                ${
                  isActive
                    ? "border border-[#B49C5B]/50 bg-[#B49C5B]/20 text-[#0a1f44]"
                    : "border border-black/10 bg-white text-gray-700 hover:border-[#B49C5B]/40 hover:text-[#0a1f44]"
                }`}
            >
              <span>{t}</span>
              {t !== "All" && (
                <span className="ms-2 rounded-full bg-black/5 px-2 py-0.5 text-xs text-gray-700">
                  {counts[t] ?? 0}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid / Empty */}
      {sliced.length ? (
        <>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sliced.map((j) => (
              <JobCard key={j.id ?? j._id} job={j} />
            ))}
          </div>

          {/* Show more */}
          {sliced.length < filtered.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisible((v) => v + pageSize)}
                className="rounded-full border border-[#B49C5B]/40 bg-[#B49C5B]/10 px-5 py-2 text-sm text-[#0a1f44] hover:bg-[#B49C5B]/15"
              >
                Show more . . .
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-black/10 bg-white p-8 text-center text-gray-700">
          No positions in{" "}
          <span className="text-[#0a1f44] font-medium">{active}</span> right
          now.
        </div>
      )}
    </div>
  );
}

/* Helpers */
function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// src/app/careers/page.tsx
import UnifiedHero from "../components/UnifiedHero";
import JobsBrowser from "./components/JobsBrowser";
import UnitsStrip from "./components/UnitsStrip";
import BenefitsGrid from "./components/BenefitsGrid";
import InternshipPrograms from "./components/InternshipPrograms";
import HowToApply from "./components/HowToApply";
import HRContactCard from "./components/HRContactCard";

import { getSettings } from "../../../sanity/sanity-utils";
import { client } from "../../../sanity/lib/client";
import { GROQ } from "../../../sanity/lib/queries";
import type { Job } from "../../../types/job";
import BackToTopButton from "../components/BackToTopButton";

/** ---------- Local types (keep loose to match GROQ) ---------- */
type Unit = {
  title?: string;
  subtitle?: string;
  description?: string;
  logoUrl?: string | null;
};

type BenefitItem = { text: string; iconKey?: string };

type CareersContent = {
  // Hero
  title?: string;
  intro?: string;

  // Units
  unitsHeading?: string;
  unitsSubtext?: string;
  units?: Unit[];

  // Why work
  whyWorkHeading?: string; // الاسم الجديد
  benefitsHeading?: string; // fallback لو لسه قديم
  whyWorkItems?: BenefitItem[]; // الجديد { text, iconKey }
  whyUs?: string[]; // legacy: نصوص بدون أيقونات

  // Jobs
  jobsHeading?: string;
  jobsSubtext?: string;
  emptyState?: string;

  // Internships
  internshipTitle?: string;
  internshipBody?: string;

  // How to apply
  howToApplyTitle?: string;
  howToApplySteps?: string[];
  howToApply?: string[]; // fallback اسم بديل

  // HR
  hr?: { email?: string; phone?: string; whatsapp?: string };
};

interface Props {
  params: Promise<{ locale: string }>
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params

  const [settings, page, jobs] = await Promise.all([
    getSettings(locale),
    client.fetch<CareersContent>(GROQ.careersPage, { language: locale }),
    client.fetch<Job[]>(GROQ.jobs, { language: locale }),
  ]);

  /** ---- SAFE defaults for Why-Work section (عشان ما يختفي لو البيانات ناقصة) ---- */
  const DEFAULT_BENEFITS: BenefitItem[] = [
    { text: "Contribute to high-impact projects", iconKey: "shield" },
    { text: "Gain hands-on experience in multiple sectors", iconKey: "layers" },
    {
      text: "Join a team that values integrity, innovation, and collaboration",
      iconKey: "users",
    },
    { text: "Opportunities for career growth", iconKey: "growth" },
    {
      text: "Inclusive, diverse, and empowering environment",
      iconKey: "sparkles",
    },
  ];

  // العنوان: الجديد ثم القديم ثم افتراضي
  const whyWorkHeading =
    page?.whyWorkHeading ?? page?.benefitsHeading ?? "Why Work with Us?";

  // العناصر: الجديد ثم تحويل القديم ثم افتراضي
  const whyWorkItems: BenefitItem[] =
    page?.whyWorkItems ??
    (page?.whyUs ? page.whyUs.map((t) => ({ text: t })) : undefined) ??
    DEFAULT_BENEFITS;

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      {/* Hero */}
      <UnifiedHero
        title={page?.title ?? "Join Our Mission to Build the Future of Sudan"}
        subtitle={
          page?.intro ??
          "We’re a community of innovators, builders, and changemakers."
        }
        heroMediaType={settings?.heroMediaType}
        videoSource={settings?.videoSource}
        heroImage={settings?.heroImage}
        heroVideoFile={settings?.heroVideoFile}
        heroVideoUrl={settings?.heroVideoUrl}
        height="medium"
      />

      {/* Units / Business strips */}
      <UnitsStrip
        heading={page?.unitsHeading}
        subtext={page?.unitsSubtext}
        units={page?.units}
      />

      {/* ----- Why Work With Us ----- */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-20">
          <BenefitsGrid heading={whyWorkHeading} items={whyWorkItems} />
        </div>
      </section>

      {/* Jobs list */}
      <section className="px-6 sm:px-20 py-16 bg-white">
        <div className="mx-auto max-w-7xl">
          {(page?.jobsHeading || page?.jobsSubtext) && (
            <div className="mb-4 text-center">
              {page?.jobsHeading && (
                <h2 className="text-2xl font-semibold text-[#0a1f44]">
                  {page.jobsHeading}
                </h2>
              )}
              {page?.jobsSubtext && (
                <p className="mt-1 text-sm text-[#586270]">
                  {page.jobsSubtext}
                </p>
              )}
            </div>
          )}

          <JobsBrowser jobs={jobs} />

          {(!jobs || jobs.length === 0) && (
            <p className="mt-6 text-center text-sm text-[#586270]">
              {page?.emptyState ?? "No openings at the moment."}
            </p>
          )}
        </div>
      </section>

      {/* Internships */}
      <InternshipPrograms
        title={page?.internshipTitle}
        body={page?.internshipBody}
      />

      {/* How to apply */}
      <HowToApply
        title={page?.howToApplyTitle}
        steps={page?.howToApplySteps ?? page?.howToApply}
      />

      {/* HR Contact */}
      <HRContactCard
        title="HR Contact"
        email={page?.hr?.email}
        phone={page?.hr?.phone}
        whatsapp={page?.hr?.whatsapp}
      />
      <BackToTopButton />
    </main>
  );
}

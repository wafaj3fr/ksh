// src/app/careers/[slug]/page.tsx
import { PortableText } from "next-sanity";
import client, { getSettings } from "../../../sanity/sanity-utils";
import { GROQ } from "../../../sanity/lib/queries";
import Section from "../../components/ui/Section";
import Pill from "../../components/ui/Pill";
import Card from "../../components/ui/Card";
import JobApplicationForm from "../../components/forms/JobApplicationForm";
import UnifiedHero from "../../components/UnifiedHero";

export default async function JobPage(props: { params: Promise<{ slug: string }> }) {
  // ✅ حل المشكلة: await props.params
  const { slug } = await props.params;

  const job = await client.fetch(GROQ.jobBySlug, { slug });

  if (!job) {
    return (
      <div className="px-6 py-12 text-[#3a3f46]">
        Not found
      </div>
    );
  }

  const meta = [job.department, job.location, job.type].filter(Boolean);
  const settings = await getSettings();
  return (
    <main className="pb-24 bg-[#f5f7fa] text-gray-900">
      {/* <Hero heroTitle={job.title} heroSubtitle={job.intro} /> */}
      <UnifiedHero
              title={job.title}
              subtitle="Explore our journey, leadership, and vision for building a better future for Sudan and the region."
              heroMediaType={settings.heroMediaType}
              videoSource={settings.videoSource}
              heroImage={settings.heroImage}
              heroVideoFile={settings.heroVideoFile}
              heroVideoUrl={settings.heroVideoUrl}
              height="medium"
            />

      <Section>
        <div className="mt-6 flex flex-wrap gap-2">
          {meta.map((m: string, i: number) => (
            <Pill key={i}>{m}</Pill>
          ))}
          {job.deadline && (
            <Pill tone="accent">
              Apply by {new Date(job.deadline).toLocaleDateString()}
            </Pill>
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,420px]">
<article className="max-w-none text-gray-800">
  {/* Description */}
  {job.description && (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-primary mb-2">Job Description</h3>
      <span className="block w-16 h-1 bg-[#B49C5B] rounded mb-4" />
      <div className="space-y-4 leading-relaxed text-gray-700">
        <PortableText value={job.description} />
      </div>
    </div>
  )}
</article>

<article className="max-w-none text-gray-800">
  {/* ✅ Requirements (معدلة بالستايل الجديد + underline) */}
  {job.requirements && (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-primary mb-2">Requirements</h3>
      <span className="block w-16 h-1 bg-[#B49C5B] rounded mb-4" />
      <ul className="space-y-3">
        {job.requirements.map((req: unknown, idx: number) => (
          <li
            key={idx}
            className="flex items-start gap-3 bg-white shadow-sm border border-[#e5e7eb] rounded-lg p-3 hover:shadow-md transition"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              {idx + 1}
            </span>
            <span className="text-gray-800 leading-relaxed">
              {typeof req === "string" ? req : (req as Record<string, unknown>)?.children?.[0]?.text || 'Requirement text'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )}
</article>

<Card className="p-6">
  <h2 className="mb-2 text-2xl font-semibold text-primary">Apply for this role</h2>
  <span className="block w-16 h-1 bg-[#B49C5B] rounded mb-4" />
  <JobApplicationForm jobId={job._id} />
</Card>

        </div>
      </Section>
    </main>
  );
}

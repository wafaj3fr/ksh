"use client";

import { Link } from "@/i18n/navigation";
import { Job } from "../../../../types/job";
import Card from "../../components/ui/Card";
import Pill from "../../components/ui/Pill";
import Button from "../../components/ui/Button";

export default function JobCard({ job }: { job: Job }) {
  const meta = [job.department, job.location, job.type].filter(
    Boolean
  ) as string[];
  const slug = typeof job.slug === "string" ? job.slug : job.slug?.current;

  return (
    <Card className="p-6 group hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-[#0a1f44]">{job.title}</h3>

      {meta.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.map((m, i) => (
            <Pill key={i}>{m}</Pill>
          ))}
          {job.deadline && (
            <Pill tone="accent">
              Apply by {new Date(job.deadline).toLocaleDateString()}
            </Pill>
          )}
        </div>
      )}

      <div className="mt-5">
        <Link href={`/careers/${slug ?? ""}`} prefetch>
          <Button variant="outline">Read more</Button>
        </Link>
      </div>
    </Card>
  );
}

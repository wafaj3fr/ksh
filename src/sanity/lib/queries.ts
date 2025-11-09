// ./src/sanity/lib/queries.ts
import { defineQuery } from 'next-sanity';
import { client } from './client';

/* ------------ Local Types (optional, handy in pages) ------------- */
export type Homepage = {
  title: string;
  tagline: string;
  description: string;
  aboutSection: string;
  subsidiaries: Array<{ name: string; slug: string }>;
};

export type Job = {
  _id: string;
  id: string;               // alias of _id
  title: string;
  slug: string;             // flattened: slug.current
  department?: string;
  location?: string;
  type?: string;
  category?: string;
  deadline?: string;
  description?: any[];      // PortableText
  requirements?: any[];     // PortableText
  intro?: string;           // optional intro for detail page
};

/* ---------------------- Blog examples (existing) ------------------ */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)][0...12]{
    _id, title, slug
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title, body, mainImage
  }
`);

/* ------------------------ Homepage helper ------------------------- */
export async function getHomepage(): Promise<Homepage> {
  return await client.fetch(`
    *[_type == "homepage"][0]{
      title,
      tagline,
      description,
      aboutSection,
      subsidiaries[]->{
        name,
        slug
      }
    }
  `);
}

/* ----------------------- Careers / Jobs --------------------------- */
/** Raw GROQ strings (use in server components or helpers) */
export const GROQ = {
  // === Careers singleton with all new fields (no LinkedIn) ===
  careersPage: defineQuery(`*[_type == "careersPage" && language == $language][0]{
    title,
    intro,
    units[]{title, description, "logoUrl": logo.asset->url},
    benefitsHeading,
    whyUs,
    jobsHeading,
    jobsSubtext,
    emptyState,
    internshipTitle,
    internshipBody,
    howToApplyTitle,
    howToApplySteps,
    hr{email, phone, whatsapp}
  }`),

  // LIST: filtered by language
  jobs: defineQuery(`*[_type == "job" && language == $language] | order(_createdAt desc){
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    department,
    location,
    type,
    category,
    deadline
  }`),

  // DETAIL: this is the ONLY query that uses $slug
  jobBySlug: defineQuery(`*[_type == "job" && slug.current == $slug && language == $language][0]{
    _id,
    "id": _id,
    title,
    "slug": slug.current,
    intro,
    department,
    location,
    type,
    category,
    deadline,
    description,
    requirements
  }`),
};

/** Optional typed helpers (nice DX in pages) */
export const groq = {
  careersPage: `
    *[_type == "careersPage"][0]{
      title,
      intro,

      unitsHeading,
      unitsSubtext,
      units[]{
        title,
        subtitle,
        description,
        "logoUrl": logo.asset->url
      },

      // Why Work With Us (الجديد فقط)
      whyWorkHeading,
      whyWorkItems,

      jobsHeading,
      jobsSubtext,
      emptyState,

      internshipTitle,
      internshipBody,

      howToApplyTitle,
      howToApplySteps,

      hr
    }
  `,
  jobs: `*[_type == "job"] | order(_createdAt desc){ ..., "id": _id, "slug": slug.current }`,
  jobBySlug: `*[_type == "job" && slug.current == $slug][0]{ ..., "id": _id }`,
};

export const getJobs = (language: string = 'en') => client.fetch<Job[]>(GROQ.jobs, { language });
export const getJobBySlug = (slug: string, language: string = 'en') => client.fetch<Job>(GROQ.jobBySlug, { slug, language });

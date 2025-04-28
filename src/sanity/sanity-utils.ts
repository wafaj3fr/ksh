import { createClient, groq } from "next-sanity";

export async function getProjects() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-28-04',
    useCdn: true,
  });

  return client.fetch(
    /* groq */
    groq`*[_typr == "project"]{
      _id,
      _createdAt,
      name,
      "slug: slug.current,
      "image": image.asset->url,
      url,
      content,    
    }`
    )
}

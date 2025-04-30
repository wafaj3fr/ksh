import { createClient, groq } from "next-sanity";
import { Project } from "../../types/Project";

export async function getProjects(): Promise<Project[]> {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-04-29',
    useCdn: true,
  });
  const query = groq`*[_type == "project"]{
    _id,
    name,
    content,
    slug,
    "slug": slug.current,
    image {
      asset -> {
        url
      }
    },
    technologies[] -> {
      name
    }
  
  }`;
  const projects = await client.fetch(query);
  return projects;
}

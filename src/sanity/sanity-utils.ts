import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-04-29',
  useCdn: process.env.NODE_ENV === 'production',
});
console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);


export async function getProjects() {
  return client.fetch(groq`*[_type == "project"]{
    _id,
    title,
    tagline,
    description,
    "slug": slug.current,
    logo {
      asset->{
        url
      }
    },
    heroImage {
      asset->{
        url
      },
      alt
    },
    aboutSection {
      heading,
      content,
    },
    ceoMessage->{
        heading,
        message
      },
      visionSection->{
        title,
        content
      },
      whyUs->{
        title,
        points
      },
    subsidiaries[]->{
      _id,
      name,
      "slug": slug.current,
      logo {
        asset->{
          url
        }
      }
    }
  }`);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(groq`*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    tagline,
    description,
    "slug": slug.current,
    logo {
      asset->{
        url
      }
    },
    heroImage {
      asset->{
        url
      },
      alt
    },
    aboutSection {
      heading,
      content
    },
    subsidiaries[]->{
      _id,
      name,
      "slug": slug.current,
      logo {
        asset->{
          url
        }
      }
    }
  }`, { slug });
}
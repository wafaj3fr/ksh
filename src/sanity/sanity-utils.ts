import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-04-29',
  useCdn: process.env.NODE_ENV === 'production',
});
console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);

export default client;


export async function getSettings() {
  return await client.fetch(groq`
    *[_type == "settings"][0]{
      logo,
      contactInfo,
      socialMedia
    }
  `);
}

export async function getMissionVisionGoals() {
  return await client.fetch(groq`
    *[_type == "missionVisionGoals"][0]{
      mission,
      vision,
      goals
    }
  `);
}

export async function getSubsidiaries() {
  return await client.fetch(groq`
    *[_type == "subsidiary"]{
      _id,
      name,
      sector,
      description,
      website,
      email,
      phone,
      location,
      logo{
        asset->{
          url
        }
      }
    }
  `);
}

export async function getCSR() {
  return await client.fetch(groq`
    *[_type == "csr"]{
      title,
      description,
      projects[]{
        name,
        impact
      }
    }
  `);
}

export async function getNews() {
  return await client.fetch(groq`
    *[_type == "news"] | order(date desc){
      _id,
      title,
      date,
      content
    }
  `);
}

export async function getCEOMessage() {
  return await client.fetch(groq`
    *[_type == "ceoMessage"][0]{
      title,
      message,
      image{
        asset->{
          url
        }
      }
    }
  `);
}
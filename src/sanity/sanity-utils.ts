import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-04-29",
  useCdn: process.env.NODE_ENV === "production",
  timeout: 15000,
});

export default client;

/**
 * Fetch Settings
 */
export async function getSettings() {
  try {
    const data = await client.fetch(groq`
      *[_type == "settings"][0]{
        logo {
          asset->{
            url
          },
          alt
        },
        heroImage {
          asset->{
            url
          },
          alt
        },
        heroVideo {
          asset->{
            url
          },
          alt
        },
        heroTitle,
        heroSubtitle,
        contactInfo,
        socialMedia
      }
    `);
    return data;

  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

/**
 * Fetch Mission, Vision, Goals
 */
export async function getMissionVisionGoals() {
  try {
    const data = await client.fetch(groq`
      *[_type == "missionVisionGoals"][0]{
        mission,
        vision,
        goals
      }
    `);
    return data;

  } catch (error) {
    console.error("Error fetching Mission, Vision, Goals:", error);
    return null;
  }
}

/**
 * Fetch Subsidiaries
 */
export async function getSubsidiaries() {
  try {
    const data = await client.fetch(groq`
      *[_type == "subsidiary"]{
        _id,
        name,
        sector,
        description,
        website,
        email,
        phone,
        location,
        logo {
          asset->{
            url
          }
        }
      }
    `);
    return data;

  } catch (error) {
    console.error("Error fetching Subsidiaries:", error);
    return [];
  }
}

/**
 * Fetch CSR
 */
export async function getCSR() {
  try {
    const data = await client.fetch(groq`
      *[_type == "csr"]{
        title,
        description,
        projects[] {
          name,
          impact
        }
      }
    `);
    return data;

  } catch (error) {
    console.error("Error fetching CSR:", error);
    return [];
  }
}

/**
 * Fetch News
 */
export async function getNews() {
  try {
    const data = await client.fetch(groq`
      *[_type == "news"] | order(date desc) {
        _id,
        title,
        slug,
        date,
        content,
        mainImage {
          asset->{
            url
          },
          alt
        },
        gallery[] {
          asset->{
            url
          },
          alt
        }
      }
    `);

    return data;

  } catch (error) {
    console.error("Error fetching News:", error);
    return [];
  }
}

/**
 * Fetch CEO Message
 */
export async function getCEOMessage() {
  try {
    const data = await client.fetch(groq`
      *[_type == "ceoMessage"][0]{
        title,
        message,
        image {
          asset->{
            url
          }
        }
      }
    `);

    return data;

  } catch (error) {
    console.error("Error fetching CEO Message:", error);
    return null;
  }
}

export async function getAboutUs() {
  try {
    const data = await client.fetch(groq`
      *[_type == "about"][0]{
        title,
        content
      }
    `);
    return data;
  } catch (error) {
    console.error("Error fetching About Us:", error);
    return null;
  }
}

export async function getInvestmentSectors() {
  try {
    const data = await client.fetch(groq`
      *[_type == "investmentSector"]{
        title,
        description,
        icon
      }
    `);
    return data;
  } catch (error) {
    console.error("Error fetching Investment Sectors:", error);
    return [];
  }
}

export async function getContactInfo() {
  try {
    const data = await client.fetch(groq`
      *[_type == "contact"][0]{
        title,
        phone,
        email,
        address,
        map
      }
    `);
    return data;
  } catch (error) {
    console.error("Error fetching Contact Info:", error);
    return null;
  }
}


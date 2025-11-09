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
export async function getSettings(language: string = 'en') {
  try {
    // Try to fetch with language filter first
    let data = await client.fetch(groq`
      *[_type == "settings" && language == $language][0]{
        heroMediaType,
        videoSource,
        heroVideoUrl,
        heroVideoFile {
          asset->{
            url
          }
        },
        heroImage {
          asset->{ url },
          alt
        },
        heroTitle,
        heroSubtitle,
        logo {
          asset->{ url },
          alt
        },
        contactInfo,
      }
    `, { language });
    
    // If no settings found for this language, fall back to any settings
    if (!data) {
      data = await client.fetch(groq`
        *[_type == "settings"][0]{
          heroMediaType,
          videoSource,
          heroVideoUrl,
          heroVideoFile {
            asset->{
              url
            }
          },
          heroImage {
            asset->{ url },
            alt
          },
          heroTitle,
          heroSubtitle,
          logo {
            asset->{ url },
            alt
          },
          contactInfo,
        }
      `);
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

/**
 * Fetch Subsidiaries
 */
export async function getSubsidiaries(language: string = 'en') {
  try {
    const data = await client.fetch(groq`
      *[_type == "subsidiary" && language == $language]{
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
    `, { language });
    
    return data;

  } catch (error) {
    console.error("Error fetching Subsidiaries:", error);
    return [];
  }
}

/**
 * Fetch News
 */
export async function getNews(language: string = 'en') {
  try {
    const data = await client.fetch(groq`
      *[_type == "news" && language == $language] | order(date desc) {
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
    `, { language });

    // Ensure all items have valid slug structure
    return data.map((item: any) => ({
      ...item,
      slug: item.slug || { current: '' },
    }));

  } catch (error) {
    console.error("Error fetching News:", error);
    return [];
  }
}

/**
 * Fetch CEO Message
 */
export async function getCEOMessage(language: string = 'en') {
  try {
    const data = await client.fetch(groq`
      *[_type == "ceoMessage" && language == $language][0]{
        title,
        message,
        image {
          asset->{
            url
          }
        }
      }
    `, { language });

    return data;

  } catch (error) {
    console.error("Error fetching CEO Message:", error);
    return null;
  }
}

export async function getInvestmentSectors(language: string = 'en') {
  try {
    const data = await client.fetch(groq`
      *[_type == "investmentSector" && language == $language]{
        title,
        description,
        icon
      }
    `, { language });
    
    return data;
  } catch (error) {
    console.error("Error fetching Investment Sectors:", error);
    return [];
  }
}


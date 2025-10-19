import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "../env";

/**
 * 🔧 Sanity Client Configuration
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_WRITE_TOKEN ?? undefined,
});

/**
 * ✅ Legacy alias (for compatibility with old imports)
 */
export const client = sanityClient;

/**
 * 🖼️ Image URL builder
 */
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// ✅ Optional helper (auto-fetch)
export const fetchSanity = async (query: string, params = {}) => {
  return sanityClient.fetch(query, params);
};

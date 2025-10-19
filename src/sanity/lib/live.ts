// 📴 Live mode temporarily disabled — using standard Sanity fetch

// import { defineLive } from 'next-sanity'
// import { client } from './client'

// export const { sanityFetch, SanityLive } = defineLive({
//   client: client.withConfig({
//     apiVersion: 'vX' // live API version
//   }),
// })

// ✅ Fallback fetch (no live mode)
export const sanityFetch = async (query: string, params = {}) => {
  console.warn("⚠️ Live mode disabled. Using standard GROQ fetch instead.");
  const { sanityClient } = await import("./client");
  return sanityClient.fetch(query, params);
};

export const SanityLive = null;


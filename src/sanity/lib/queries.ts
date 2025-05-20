// ./src/sanity/lib/queries.ts

import {defineQuery} from 'next-sanity'
import { client } from './client';

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`)

// lib/queries.ts
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
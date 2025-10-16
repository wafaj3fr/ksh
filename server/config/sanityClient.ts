import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01",
  token: process.env.SANITY_WRITE_TOKEN || "",
  useCdn: false,
});

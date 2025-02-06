import { createClient } from 'next-sanity';

// Make sure your environment variables are being loaded properly
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: process.env.NODE_ENV === 'production', // Use the CDN only in production
  apiVersion: '2023-01-01', // Use the desired API version
});

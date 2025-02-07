import { createClient } from 'next-sanity';

import { projectId, dataset, token  } from '../env';

export const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: process.env.NODE_ENV === 'production', // Use the CDN only in production
  apiVersion: '2023-01-01', // Use the desired API version
});

import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from '../env';

export const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: true, // Set to `false` for server-side usage
  apiVersion: '2021-08-31', // Use the desired API version
});
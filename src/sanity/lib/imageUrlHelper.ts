import imageUrlBuilder from '@sanity/image-url';
import { client } from './client'; // Ensure you have your Sanity client set up

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source).url(); // Returns the full image URL
};


import { client } from "./client";



export const uploadImageToSanity = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(
      `https://${client.config().projectId}.api.sanity.io/v2021-10-21/assets/images/${client.config().dataset}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${client.config().token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();
    return data.url; // Returns the uploaded image URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

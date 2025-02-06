import { client } from "./client";

export const addProductToSanity = async (productData: any) => {
  try {
    const newProduct = await client.create({
      _type: 'products', // Your Sanity schema type
      ...productData,
    });
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

import { client } from "./client";

interface Product {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  stock?: number;
}

export const addProductToSanity = async (productData: Product): Promise<Product> => {
  try {
    const newProduct = await client.create<Product>({
      _type: 'products', // Explicitly set the type here
      ...productData, // Spread the rest of the product details
    } as any); // Temporary fix to bypass unexpected type conflicts
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

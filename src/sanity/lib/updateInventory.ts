import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your_project_id', // Replace with your Sanity project ID
  dataset: 'production',
  useCdn: false,
  token: 'your_sanity_token',
});

// Function to update inventory when a product is purchased
export const updateInventory = async (productId: string, purchasedQuantity: number) => {
  try {
    // Fetch current inventory from Sanity
    const product = await client.fetch(`*[_id == $id][0] {inventory}`, { id: productId });

    if (!product) {
      throw new Error('Product not found!');
    }

    const newInventory = product.inventory - purchasedQuantity;

    if (newInventory < 0) {
      throw new Error('Not enough stock available!');
    }

    // Update inventory in Sanity
    await client.patch(productId).set({ inventory: newInventory }).commit();

    return newInventory;
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
};

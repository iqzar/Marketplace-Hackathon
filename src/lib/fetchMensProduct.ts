import { client } from "@/sanity/lib/client"; // Import the Sanity client

// Define the product type to ensure consistent typing
export interface Product {
  _id: string;
  title: string;
  productName: string;
  image: string; // URL of the product image
  color: string; // Product color
  price: number; // Product price
  status: string;
  inventory: number;
  size: string;
  description: string;
  category: string; // Product category (e.g., "Men's Shoe")
}

// Fetch products from Sanity
export default async function fetchMenProducts(): Promise<Product[]> {
  const data = await client.fetch(
    `*[_type == "product" && category == "Men's Shoe"] | order(title asc) {
      _id,
      title,
      productName,
      "image": image.asset->url,
      color,
      price,
      size,
      category,
      status,
      inventory,
      description
    }`
  );

  return data as Product[]; // Return the fetched products with type assertion
}

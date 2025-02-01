import { client } from "@/sanity/lib/client"; // Import the Sanity client

// Define the product type to ensure consistent typing
export interface Jordan {
  _id: string;
  title: string;
  productName: string;
  image: string;
  color: string;
  price: number;
  size: string;
  status: string;
  inventory: number;
  description: string;
  category: string;
}

// Fetch products from multiple categories
export default async function fetchProductsByCategories(): Promise<Jordan[]> {
  const data = await client.fetch(
    `*[_type == "product" && (category == "Men's Shoe" || category == "Women's Shoe")] | order(title asc) {
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

  return data as Jordan[]; // Return the fetched products with type assertion
}

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
  category: string; // Product category
}

// Fetch products from Sanity
export default async function fetchWomensProducts(): Promise<Product[]> {
  const data = await client.fetch(
    `*[_type == "product" && category == $category] | order(title asc) {
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
    }`,
    { category: "Women's Shoes" } // Pass the category variable to the query
  );

  return data as Product[]; // Return the fetched products with type assertion
}

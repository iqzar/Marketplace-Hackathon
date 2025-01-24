import { client } from "@/sanity/lib/client"; 

export interface Product {
  _id: string;
  title: string;
  productName: string;
  image: string; 
  color: string;
  price: number;
  size: string;
  category: string;
  status: string;
  inventory: number;
  description: string;
}

// Fetch products with parent category names
export default async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(title asc) {
    _id,
    title,
    productName,
    "image": image.asset->url,
    color,
    price,
    size,
    status,
    category,
    inventory,
    description,

  }`;

  try {
    const data = await client.fetch(query);
    return data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

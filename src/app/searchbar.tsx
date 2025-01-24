'use client';
import { useState } from 'react';
import { client } from "@/sanity/lib/client";
import Image from 'next/image';

interface Product {
  _id: string;
  productName: string;
  image: string;
  price: number;
  status: string;
  description: string;
  category: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]); // Corrected typing here

  const handleSearch = async (query: string) => {
    if (query.trim() !== '') {
      const searchResults = await client.fetch(
        `*[_type == "product" && productName match $searchQuery] {
          _id,
          productName,
          "image": image.asset->url,
          price,
          description,
          category,
          status
        }`,
        { searchQuery: query }
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative text-sm font-sans">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search here.."
        className="border lg:px-2 rounded-full"
      />

      {/* Overlay for search results */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          <div className="p-4 space-y-4">
            {results.map((product: Product) => ( // Use Product type here
              <div key={product._id} className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.productName}
                  className="w-24 h-16 object-cover"
                  width={96}  // Explicitly add width and height for Image component
                  height={64}
                />
                <div>
                  <p className="lg:text-xs text-[2px] font-semibold">{product.productName}</p>
                  <p className="lg:text-xs text-[2px] text-gray-500">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

'use client';

import Arrows from './arrows';
import React, { useEffect, useState } from 'react';
import fetchProducts from '@/lib/fetchJordan'; 
import Image from 'next/image';
import Link from 'next/link';

// Define the structure of a product
interface Product {
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

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0); // Index of the first product to be displayed

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(); // Fetch product data
      setProducts(data.slice(0, 8)); // Limit to 8 products
    };

    loadProducts();
  }, []);

  // Function to show the next set of products (move left)
  const nextProducts = () => {
    if (startIndex + 4 < products.length) {
      setStartIndex(startIndex + 1); // Move the window right
    }
  };

  // Function to show the previous set of products (move right)
  const prevProducts = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1); // Move the window left
    }
  };

  return (
    <main>
      <div className="flex justify-between md:mt-20 mt-28 ml-10 mr-10 mb-5">
        <h2 className="text-[18px] md:text-[22px] font-semibold">Best of Air Max</h2>
        <div className="flex space-x-3">
          <p className="text-[15px]">Shop</p>
          <Arrows onPrev={prevProducts} onNext={nextProducts} /> {/* Pass the functions to Arrows */}
        </div>
      </div>
      
      <div className="flex md:flex-row flex-col md:justify-evenly lg:space-x-8 md:ml-10 md:pl-20  ml-10 mr-20 md:mt-0 mt-8">
        {products.slice(startIndex, startIndex + 4).map((product) => (
          <div key={product._id} className="mb-6">
              <Link href={`/productdetail/${product._id}`}>
            <Image src={product.image} height={250} width={250} alt={product.productName} />
            <div className="flex justify-between mt-5 text-[12px] text-black">
              <p className="font-semibold">{product.productName}</p>
              <p className="font-semibold">{product.price}</p>
             
            </div>
           </Link>
          </div>
  ))}
</div>
      
    </main>
  );
};

export default AllProducts;

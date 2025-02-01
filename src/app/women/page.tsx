'use client';

import Top from '../top';
import Header from '../header';
import Footer from '../footer';
import React, { useEffect, useState } from 'react';
import fetchWomensProducts from '@/lib/fetchWomensProducts'; // Import the fetchProducts function
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '../LoadSpinner'; // Import the spinner component

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

const WomensProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchWomensProducts(); // Fetch product data
      console.log('Fetched Products:', data); // Log fetched data
      setProducts(data); // Set the products data to the state
      setLoading(false); // Set loading to false after data is fetched
    };

    loadProducts(); // Fetch products on mount
  }, []);

  // Show the loading spinner if the data is still being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show message if no products are available
  if (products.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No products available at the moment. Please check back later!</p>
      </div>
    );
  }

  return (
    <main>
      <Top />
      <Header />

      <div className="flex md:justify-between space-x-5 md:mt-16 md:ml-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 md:ml-10 md:mr-10">
          {products.map((product) => (
            <div key={product._id} className="mb-8">
              <div className="group relative overflow-hidden mr-4 md:mr-10">
                <Link href={`/productdetail/${product._id}`}>
                  <Image
                    src={product.image}
                    height={348}
                    width={348}
                    alt={product.productName}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <p className="text-[14px] text-red mt-2 font-semibold">{product.status}</p>
              <p className="text-[14px] mt-1 font-semibold">{product.productName}</p>
              <p className="text-[14px] mt-1">{product.category}</p>
              <p className="text-[14px] mt-1">{product.color}</p>
              <p className="text-[14px] mt-2 text-side font-semibold">
                MRP: <span className="text-black">${product.price}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default WomensProducts;

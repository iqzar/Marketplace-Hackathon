'use client';

import Top from '../top';
import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';
import React, { useEffect, useState } from 'react';
import fetchProducts from '@/lib/fetchProduct'; 
import Link from 'next/link';
import Image from 'next/image';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(); // Fetch product data
      setProducts(data); 
    };

    loadProducts(); 
  }, []);

  // Function to handle category selection from Sidebar
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

   
  return (
    <main>
      <Top />
      <Header />

      <div className="flex md:justify-between space-x-5 md:mt-16 md:ml-2">
        <Sidebar onCategorySelect={handleCategorySelect} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 md:ml-5 md:mr-10">
          {filteredProducts.map((product, index) => (
            <div key={product._id} className={`${index >= 3 && index % 3 === 0 ? '' : 'mb-8'}`}>
              <div className="group relative overflow-hidden mr-4 md:mr-5">
             
                <Link href={`/productdetail/${product._id}`}>
                  <Image
                    src={product.image}
                    height={448}
                    width={448}
                    alt={product.productName}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>

              <p className="text-[14px] text-red mt-2 font-semibold">{product.status}</p>
              <p className="text-[14px] mt-1 font-semibold">{product.productName}</p>
              <p className="text-[14px] mt-1">{product.price}</p>
              <p className="text-[14px] mt-1">{product.color}</p>
              <p className="text-[14px] mt-2 text-side font-semibold">Category: {product.category}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AllProducts;

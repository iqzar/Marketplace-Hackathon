'use client';

'use client';
import Top from '../top';
import Header from '../header';
import Footer from '../footer';
import React, { useEffect, useState } from 'react';
import KidsProducts from '@/lib/kidsProducts'; // Import the fetchProducts function
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

  useEffect(() => {
    const loadProducts = async () => {
      const data = await KidsProducts(); // Fetch product data
      setProducts(data); // Set the products data to the state
    };

    loadProducts(); // Fetch products on mount
  }, []);

  return (
    <main>
      <Top />
      <Header />

      <div className="flex md:justify-between space-x-5 md:mt-16 md:ml-5">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 md:ml-10 md:mr-10">
          {products.map((product, index) => (
            <div key={product._id} className={` ${index >= 3 && index % 3 === 0 ? '' : 'mb-8'}`}>
              <div className="group relative overflow-hidden mr-4 md:mr-10">
                <Link href={`/productdetail/${product._id}`}>
                  <Image
                    src={product.image}
                    height={348}
                    width={348}
                    alt={product.productName}
                    className="object-cover"
                  />
                </Link>
              </div>

              <p className="text-[14px] text-red mt-2 font-semibold">{product.status}</p>
              <p className="text-[14px] mt-1 font-semibold">{product.productName}</p>
              <p className="text-[14px] mt-1">{product.category}</p>
              <p className="text-[14px] mt-1">{product.color}</p>
              <p className="text-[14px] mt-2 text-side font-semibold">MRP: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AllProducts;

'use client'
import React, { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'next/navigation';
import Top from "../../top";
import Header from "../../header";
import Footer from "../../footer";

// Product type definition
interface Product {
  _id: string;
  productName: string;
  image: string;
  description: string;
  price: string;
  size: string;
  color: string[];
  inventory: number;
  category: string;
  status: string;
}

async function fetchProductById(id: string): Promise<Product | null> {
  const product = await client.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id,
      productName,
      "image": image.asset->url,
      description,
      status,
      price,
      inventory,
      category,
    }`,
    { id }
  );
  return product || null;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProductById(params.id);
      setProduct(productData);
    };
    
    loadProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading ...</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.productName,
        image: product.image,
        price: parseFloat(product.price),
        quantity: 1,
      });
      router.push('/cart');
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      // Retrieve existing wishlist from localStorage or initialize as an empty array
      const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

      // Check if the product is already in the wishlist to prevent duplicates
      const isAlreadyInWishlist = existingWishlist.some((item: Product) => item._id === product._id);

      if (!isAlreadyInWishlist) {
        existingWishlist.push({
          _id: product._id,
          productName: product.productName,
          image: product.image,
          price: product.price,
        });

        // Save the updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(existingWishlist));

        // Navigate to the wishlist page
        router.push('/wishlist');
      } else {
        alert("Product is already in your wishlist.");
      }
    }
  };

  return (
    <main>
      <Top />
      <Header />
      <div className="flex flex-col lg:flex-row lg:space-x-16 ml-4 lg:ml-16 mr-4 lg:mr-28 mt-10 lg:mt-20 mb-20 lg:mb-44">
        <div className="flex justify-center lg:justify-start mb-10 lg:mb-0">
          <Image
            src={product.image}
            height={653}
            width={653}
            alt={product.productName}
            className="max-w-full h-auto"
          />
        </div>

        <div className="w-full lg:w-378 px-4 lg:px-0">
          <h1 className="text-[28px] lg:text-[32px] text-side font-semibold leading-tight">
            {product.productName}
          </h1>
          <p className='text-green-400'>{product.status}</p>
        
          <p className="text-[14px] lg:text-[12px] leading-loose mt-6">
            {product.description}
          </p>
          <h2 className="text-[20px] lg:text-[26px] mt-3 font-bold text-rose-700">
            ${product.price}
          </h2>
          <div className='flex space-x-4'>
            <h2 className="text-[20px] lg:text-[16px] mt-6 mb-2 font-semibold">
              Category -
            </h2>
            <p className="text-[14px] lg:text-[14px] leading-loose mt-6">
              {product.category}
            </p>
          </div>

          <div className='flex space-x-4'>
            <h2 className="text-[20px] lg:text-[16px] font-semibold">
              Color -
            </h2>
            <p className="text-[14px] lg:text-[14px] leading-loose ">
              White
            </p>
          </div>
        
          <div className='flex space-x-3 mt-5'>
            <button onClick={handleAddToWishlist} className="cursor-pointer">
              <Heart size={24} className="text-gray-600 hover:text-red-500 transition duration-300" />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex items-center text-[14px] lg:text-[12px] py-2 px-6 lg:py-1 lg:px-4 bg-black text-sec rounded-full"
            >
              <ShoppingCart size={16} className="mr-2" /> Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

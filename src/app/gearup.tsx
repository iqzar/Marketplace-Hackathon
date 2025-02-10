"use client";
import Image from "next/image";
import Arrows from "./arrows";
import { useState, useEffect } from "react";
import fetchProductm from "@/lib/fetchMensProduct";
import fetchProductw from "@/lib/fetchWomensProducts";
import Link from "next/link";
// Define Product Interface
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

// Men Section Component
const MenSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductm();
      setProducts(data.slice(0, 8));
    };
    loadProducts();
  }, []);

  const nextProducts = () => {
    if (startIndex + 2 < products.length) setStartIndex(startIndex + 1);
  };

  const prevProducts = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  return (
    <div>
      <div className="flex justify-end gap-5 mt-20 md:ml-10 md:mr-10 mr-20 mb-5">
        <p className="text-[15px]">Shop Mens</p>
        <Arrows onPrev={prevProducts} onNext={nextProducts} />
      </div>
      <div className="flex md:flex-row flex-col md:space-y-0 md:space-x-4 space-y-8 md:ml-0 ml-28 md:mt-0 mt-4">
        {products.slice(startIndex, startIndex + 2).map((product) => (
          <div key={product._id} className="mb-6">
            <Image src={product.image} height={200} width={200} alt={product.productName} />
            <div className="flex md:flex-row space-x-12 md:justify-between mt-5 text-[12px] text-black">
              <p className="font-semibold">{product.productName}</p>
              <p className="font-semibold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Women Section Component
const WomenSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductw();
      setProducts(data.slice(0, 8));
    };
    loadProducts();
  }, []);

  const nextProducts = () => {
    if (startIndex + 4 < products.length) setStartIndex(startIndex + 1);
  };

  const prevProducts = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  return (
    <div>
      <div className="flex justify-end gap-5 mt-20 ml-10 mr-20 mb-5">
        <p className="text-[15px]">Shop Womens</p>
        <Arrows onPrev={prevProducts} onNext={nextProducts} />
      </div>
      <div className="flex md:flex-row flex-col md:space-y-0 md:space-x-4 space-y-8 ml-28 md:mt-0 mt-4">
        {products.slice(startIndex, startIndex + 2).map((product) => (
          <div key={product._id}>
              <Link href={`/productdetail/${product._id}`}>
            <Image src={product.image} height={200} width={200} alt="shoe1" />
            </Link>
            <div className="flex md:flex-row space-x-12 md:justify-between mt-5 text-[12px] text-black">
              <p className="font-semibold">{product.productName}</p>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// GearUp Component
const GearUp: React.FC = () => {
  return (
    <main className="flex flex-col md:flex-row justify-around">
      <MenSection />
      <WomenSection />
    </main>
  );
};

export default GearUp;

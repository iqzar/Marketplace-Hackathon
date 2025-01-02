'use client';
import Top from '../top';
import Header from '../header';
import Footer from '../footer';
import Sidebar from '../sidebar';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import p1 from '../public/p1.jpg';
import p2 from '../public/p2.jpg';
import p3 from '../public/p3.jpg';
import p4 from '../public/p4.jpg';
import p5 from '../public/p5.jpg';



  const products = [
    { id: 1, image: p1.src, title: "Just In", name: "Nike Air Force 1 Mid '07", color: "Color 1", price: "$13.995", detail: "Mens Shoes" },
    { id: 2, image: p2.src, title: "Just In", name: "Nike Air Force 1 Mid '07", color: "Color 1", price: "$13.995", detail: "Mens Shoes" },
    { id: 3, image: p3.src, title: "Just In", name: "Nike Air Force 1 Mid '07", color: "Color 1", price: "$13.995", detail: "Mens Shoes" },
    { id: 4, image: p4.src, title: "Just In", name: "Nike Air Force 1 Mid '07", color: "Color 1", price: "$13.995", detail: "Mens Shoes" },
    { id: 5, image: p5.src, title: "Just In", name: "Nike Air Force 1 Mid '07", color: "Color 1", price: "$13.995", detail: "Mens Shoes" },
   
    // Continue the same pattern for more products
  ];
  
export default function AllProducts(){
return (
    <main>
      <Top />
      <Header />

      <div className="flex md:justify-between space-x-5 md:mt-16 md:ml-5">
        <Sidebar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 md:ml-10 md:mr-10">
          {products.map((product, index) => (
            <div key={product.id} className={` ${index >= 3 && index % 3 === 0 ? '' : 'mb-8'}`}>
              <div className="group relative overflow-hidden mr-4 md:mr-10">
                <Link href={'/productdetail'}>
                  <Image src={product.image} height={348} width={348} alt={product.name} />
                </Link>
               
              </div>

              <p className="text-[14px] text-red mt-2 font-semibold">{product.title}</p>
              <p className="text-[14px] mt-1 font-semibold">{product.name}</p>
              <p className="text-[14px] mt-1">{product.detail}</p>
              <p className="text-[14px] mt-1">{product.color}</p>
              <p className="text-[14px] mt-2 text-side font-semibold">MRP: {product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      
    </main>
  );
};

'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import Top from '../top';
import Header from '../header';
import Footer from '../footer';

interface WishlistItem {
  _id: string;
  productName: string;
  image: string;
  price: string;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter(item => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <main>
      <Top />
      <Header />
      <div className="container mx-auto px-4 mt-10 mb-20">
        <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {wishlist.map(item => (
              <div key={item._id} className="border p-4 rounded-lg shadow-lg relative">
                <Link href={`/productdetail/${item._id}`}>
                  <Image src={item.image} width={300} height={300} alt={item.productName} />
                </Link>
                <h2 className="text-lg font-semibold mt-3">{item.productName}</h2>
                <p className="text-gray-700 font-medium mt-1">${item.price}</p>
                <button 
                  onClick={() => removeFromWishlist(item._id)} 
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">Your wishlist is empty.</p>
        )}
      </div>
      <Footer />
    </main>
  );
}

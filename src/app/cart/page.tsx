'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrencyString } from 'use-shopping-cart';
import { Heart, Trash } from 'lucide-react';
import Top from '../top';
import Header from '../header';
import Footer from '../footer';
import { useCart } from '../context/cartcontext';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  image?: string;
  description?: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const { state, dispatch } = useCart();
  const { cart, totalPrice } = state; // Access cart from state
  const router = useRouter();

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleChangeQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'SET_ITEM_QUANTITY', payload: { id: itemId, quantity } });
  };

  const cartItems = Object.values(cart);

  const handleCheckout = () => {
    // Prepare the data to pass to the checkout page
    const checkoutData = {
      totalPrice: totalPrice.toString(),  // Convert totalPrice to string
      cartItems: JSON.stringify(cartItems), // Convert cart items to a string
    };
  
    // Use router.push to pass the data as query parameters
    const queryParams = new URLSearchParams(checkoutData).toString();
    router.push(`/checkout?${queryParams}`);
  };

  return (
    <main>
      <Top />
      <Header />
      <div className="md:flex md:space-x-8 md:ml-20 md:mr-20 ml-10 mr-10 mt-10">
        {/* Left Section: Cart Items */}
        <div className="flex-1">
         <FreeDeliveryBanner/>
          <h2 className="text-side text-[28px] md:ml-15 ml-10 mt-5 font-semibold">Your Cart</h2>
          <CartItems
            cartItems={cartItems}
            handleRemoveItem={handleRemoveItem}
            handleChangeQuantity={handleChangeQuantity}
          />
         
        </div>

        {/* Right Section: Summary */}
        <Summary totalPrice={totalPrice} handleCheckout={handleCheckout} />
      </div>
      <Footer />
    </main>
  );
}

// Free Delivery Banner Component
function FreeDeliveryBanner() {
  return (
    <div className="w-full h-[62px] bg-sec md:pl-10 text-side flex items-center">
      <p className="text-[13px] font-semibold">Free Delivery</p>
      <div className="flex space-x-6">
        <p className="text-[13px]">Applies to orders of $50 or more.</p>
        <Link href="/" className="text-side font-semibold text-[10px] border-b-2 border-black">View Details</Link>
      </div>
    </div>
  );
}

// Cart Items Component
function CartItems({
  cartItems,
  handleRemoveItem,
  handleChangeQuantity,
}: {
  cartItems: Product[];
  handleRemoveItem: (id: string) => void;
  handleChangeQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6 mt-10">
      {cartItems.map((item) => {
        const price = item.price ?? 0;
        const quantity = item.quantity ?? 1;

        return (
          <div key={item.id} className="flex space-x-8 border-b-2 border-sec pb-6">
            <Image
              src={item.image || '/fallback-image.jpg'}
              alt={item.name}
              width={150}
              height={150}
              className="w-[150px] h-[150px]"
            />
            <div className="md:text-[16px] text-[12px] text-side flex-1">
              <div className="flex md:space-x-20 space-x-2">
                <h2 className="font-semibold mt-2">{item.name}</h2>
                <h2 className="font-semibold md:mt-2">
                  {formatCurrencyString({ value: price, currency: 'USD', language: 'en-US' })}
                </h2>
              </div>
              <p className="text-pir">{item.description}</p>
              <div className="flex items-center space-x-2 md:mt-8 mt-2">
                <button className='font-bold' onClick={() => handleChangeQuantity(item.id, quantity - 1)}>-</button>
                <p className=" border px-2">{quantity}</p>
                <button className='font-bold' onClick={() => handleChangeQuantity(item.id, quantity + 1)}>+</button>
              </div>
              <div className="flex w-12 h-12 md:w-20 md:h-20 space-x-4 md:mt-8 mt-4">
                <Heart className='hover:text-rose-700' />
                <Trash onClick={() => handleRemoveItem(item.id)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Summary Component
function Summary({
  totalPrice,
  handleCheckout,
}: {
  totalPrice: number;
  handleCheckout: () => void;
}) {
  return (
    <div className="w-full md:w-[30%] md:sticky md:top-20 mt-10 md:mt-0">
      <h2 className="text-[21px] text-side font-semibold">Summary</h2>
      <div className="flex justify-between text-[15px] mt-4">
        <h2 className="font-semibold">Subtotal :</h2>
        <h2 className="font-semibold">
          {formatCurrencyString({ value: totalPrice, currency: 'USD', language: 'en-US' })}
        </h2>
      </div>
      <div className="flex justify-between text-[15px] border-b-2 border-sec pb-4 mt-4">
        <h2 className="font-semibold">Estimated Delivery & Handling</h2>
        <h2 className="font-semibold">Free</h2>
      </div>
      <div className="flex justify-between border-b-2 border-sec mt-4 pb-4">
        <h2 className="font-semibold">Total</h2>
        <h2 className="font-semibold">
          {formatCurrencyString({ value: totalPrice, currency: 'USD', language: 'en-US' })}
        </h2>
      </div>
      <button
        className="w-full h-[60px] bg-black text-white text-[15px] rounded-full mt-6"
        onClick={handleCheckout} // Trigger checkout logic
      >
        Checkout
      </button>
    </div>
  );
}

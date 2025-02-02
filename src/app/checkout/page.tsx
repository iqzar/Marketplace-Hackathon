'use client';

import React, { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';
import Image from 'next/image';
import Header from '../header';
import Top from '../top';
import Footer from '../footer';
import { MoveRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from './action'; // Import the function from action.ts

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    cartItems: [] as Product[],
    totalAmount: 0,
    orderDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! as string); // Stripe instance

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cartItems = params.get('cartItems');
    const totalPrice = params.get('totalPrice');

    if (cartItems && totalPrice) {
      try {
        const cartItemsParsed: Product[] = JSON.parse(cartItems);
        const totalAmountParsed = parseFloat(totalPrice);

        setFormData((prevData) => ({
          ...prevData,
          cartItems: cartItemsParsed,
          totalAmount: totalAmountParsed,
          orderDate: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.firstName || !formData.lastName || !formData.address) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Create the order in Sanity
    const orderData = {
      _type: 'order',
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      cartItems: formData.cartItems.map(item => ({
        _type: 'reference',
        _ref: item.id,
      })),
      totalAmount: formData.totalAmount,
      orderDate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      toast.success('Order saved successfully! Redirecting to payment...');

      // Call createPaymentIntent function to create Stripe PaymentIntent
      const response = await createPaymentIntent(formData.totalAmount);
      if (response?.clientSecret) {
        setClientSecret(response.clientSecret);
      } else {
        throw new Error('Failed to create payment intent');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order. Try again.');
      setLoading(false);
    }
  };

  return (
    <main>
      <Top />
      <Header />
      <div className="flex space-x-1">
        <p>Cart</p>
        <MoveRight />
        <p>Checkout</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-20 justify-between mx-20 mt-20 lg:mb-10">
        <div className="w-full lg:w-2/3">
          <h2 className="text-side text-[21px] font-semibold mb-4">Enter your name and address:</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <input className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <input className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side" placeholder="Full Address" name="address" value={formData.address} onChange={handleChange} />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Processing...' : 'Submit Order'}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <h2 className="text-side text-[21px] font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {formData.cartItems.map((product) => (
              <div key={product.id} className="flex justify-between">
                <div className="flex space-x-4">
                  <Image src={product.image || '/default-image.jpg'} width={50} height={50} alt={product.name} />
                  <p className="text-[14px] text-side">{product.name}</p>
                </div>
                <p className="text-[14px] text-side">${(product.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 border-t pt-4">
            <p className="text-[16px] text-side font-semibold">Total Amount</p>
            <p className="text-[16px] text-side font-semibold">${(formData.totalAmount / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Render the Stripe Elements context only if clientSecret is available */}
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <div className="w-full lg:w-2/3 mx-auto mt-10">
            <h2 className="text-center text-[21px] font-semibold mb-4">Complete your payment:</h2>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          </div>
        </Elements>
      )}

      <Footer />
    </main>
  );
}

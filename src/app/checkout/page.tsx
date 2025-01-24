'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import logo from "../public/logo.png";
import { Lock, MessageSquareText, Package2 } from "lucide-react";
import { client } from '../../sanity/lib/client';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function Checkout() {
  const searchParams = useSearchParams(); // Get search parameters

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      postalCode: '',
      locality: '',
      state: '',
    },
    products: [] as Product[],
    totalAmount: 0,
    orderDate: '',
  });

  // Ensure this logic runs only on the client-side
  useEffect(() => {
    const cartItems = searchParams.get('cartItems');
    const totalPrice = searchParams.get('totalPrice');

    if (cartItems && totalPrice) {
      try {
        const cartItemsParsed: Product[] = JSON.parse(cartItems); // Parse cartItems from query
        const totalAmountParsed = parseFloat(totalPrice); // Parse totalPrice from query
        
        setFormData((prevData) => ({
          ...prevData,
          products: cartItemsParsed,
          totalAmount: totalAmountParsed,
          orderDate: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error parsing cart data from search parameters:', error);
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes('address')) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Save order to Sanity
      await client.create({
        _type: 'order',
        ...formData,
      });
      alert('Order submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          postalCode: '',
          locality: '',
          state: '',
        },
        products: [],
        totalAmount: 0,
        orderDate: '',
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit the order. Please try again.');
    }
  };

  return (
    <main>
      {/* Header with logo and contact */}
      <div className="flex justify-between mt-5 ml-5 mr-5">
        <Image src={logo} width={60} height={50} alt="logo" />
        <div className="flex space-x-5">
          <p className="text-[14px]">000 800 100 9538</p>
          <MessageSquareText className="w-[20px] h-[20px]" />
          <Lock className="w-[20px] h-[20px]" />
        </div>
      </div>

      {/* Main Checkout Section */}
      <div className="flex flex-col lg:flex-row lg:space-x-20 justify-between mx-20 mt-20 lg:mb-10">
        <div className="w-full lg:w-2/3">
          <h2 className="text-side text-[21px] font-semibold mb-4">
            How would you like to get your order?
          </h2>
          <div className="flex space-x-10 border-2 border-side px-6 py-4 rounded-xl mb-4">
            <Package2 className="w-[20px] h-[20px]" />
            <p className="text-side text-[15px] font-semibold">Deliver It</p>
          </div>

          <h2 className="text-side text-[21px] font-semibold mb-4">
            Enter your name and address:
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input fields for Name and Address */}
            <input
              className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side"
              placeholder="Address Line 1"
              name="address.addressLine1"
              value={formData.address.addressLine1}
              onChange={handleChange}
            />
            <input
              className="w-full border-2 border-sec px-6 py-4 rounded text-[16px] text-side"
              placeholder="Contact No."
              name="address.addressLine2"
              value={formData.address.addressLine2}
              onChange={handleChange}
            />
          
            <div className="flex space-x-5">
              <input
                className="w-1/2 border-2 border-sec px-6 py-4 rounded text-[16px] text-side"
                placeholder="Postal Code"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
              />
              <input
                className="w-1/2 border-2 border-sec px-6 py-4 rounded text-[16px] text-side"
                placeholder="Locality"
                name="address.locality"
                value={formData.address.locality}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit Order
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <h2 className="text-side text-[21px] font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {formData.products.map((product) => (
              <div key={product.id} className="flex justify-between">
                <div className="flex space-x-4">
                  <Image src={product.image || "/default-image.jpg"} width={50} height={50} alt={product.name} />
                  <p className="text-[14px] text-side">{product.name}</p>
                </div>
                <p className="text-[14px] text-side">${(product.price * product.quantity) / 100}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 border-t pt-4">
            <p className="text-[16px] text-side font-semibold">Total Amount</p>
            <p className="text-[16px] text-side font-semibold">${formData.totalAmount / 100}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

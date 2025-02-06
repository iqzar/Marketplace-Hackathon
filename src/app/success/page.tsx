// app/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear local storage or cart data if needed
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order has been submitted successfully.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Go to Home
      </button>
    </div>
  );
}

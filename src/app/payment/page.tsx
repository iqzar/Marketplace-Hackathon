'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const cartItemsStr = searchParams.get('cartItems');
  const totalAmountStr = searchParams.get('totalAmount');

  const cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
  const totalAmount = totalAmountStr ? parseFloat(totalAmountStr) : 0;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Error creating PaymentIntent');
        }

        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error('clientSecret not found in response');
        }
      } catch (error: any) {
        console.error('Error creating PaymentIntent:', error);
        setErrorMessage(error.message || 'Failed to initiate payment');
        toast.error(error.message || 'Failed to initiate payment');
      }
    };

    if (totalAmount > 0) {
      createPaymentIntent();
    } else {
      setErrorMessage('Invalid total amount provided.');
      console.error('Invalid total amount:', totalAmount);
    }
  }, [totalAmount]);

  if (errorMessage) {
    return <div className="text-red-500">Error: {errorMessage}</div>;
  }

  if (!clientSecret) {
    return <div>Loading payment details...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Complete your Payment</h2>
        <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />
        <PaymentForm clientSecret={clientSecret} />
      </div>
    </Elements>
  );
}

// Order Summary Component
interface OrderSummaryProps {
  cartItems: any[];
  totalAmount: number;
}

function OrderSummary({ cartItems, totalAmount }: OrderSummaryProps) {
  return (
    <div className="border p-4 mb-6">
      <h3 className="font-semibold text-xl mb-2">Order Summary</h3>
      {cartItems.map((product: any, index: number) => (
        <div key={index} className="flex justify-between">
          <p>{product.name}</p>
          <p>${(product.price / 100).toFixed(2)}</p>
        </div>
      ))}
      <div className="flex justify-between border-t pt-2 mt-2">
        <p className="font-bold">Total Amount</p>
        <p className="font-bold">${(totalAmount / 100).toFixed(2)}</p>
      </div>
    </div>
  );
}

// Payment Form Component
interface PaymentFormProps {
  clientSecret: string;
}

function PaymentForm({ clientSecret }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (paymentSuccess) {
      router.push(`/success`); // Redirect after payment success
    }
  }, [paymentSuccess, router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error('Card Element not found.');
      setLoading(false);
      return;
    }

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: fullName, // Pass the full name here
          email,
        },
      }
    } );

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else if (paymentIntent?.status === 'succeeded') {
      toast.success('Payment succeeded!');
      setPaymentSuccess(true); // Trigger useEffect to redirect
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
        <input
        type="text"
        placeholder="Enter your full name"
        className="p-2 border w-full mb-4"
        value={fullName}
        onChange={(e) => setfullName(e.target.value)} // Update the state for full name
        required
      />
      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 border w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <CardElement className="p-4 border mb-4" />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading || !stripe}
        onClick={() => router.push('/success')}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

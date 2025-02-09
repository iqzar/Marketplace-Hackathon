'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const totalAmountParam = searchParams.get("totalAmount");
  const totalAmount = totalAmountParam ? parseFloat(totalAmountParam) : 0;

  console.log("Received totalAmount:", totalAmount); // ✅ Debugging log

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
          throw new Error('Invalid total amount provided.');
        }

        const response = await fetch('/api/payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: totalAmount * 100 }), // Convert to cents
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Error creating PaymentIntent');
        }

        const data: { clientSecret: string } = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating PaymentIntent:", error);
        setErrorMessage(error instanceof Error ? error.message : 'Payment initiation failed');
      }
    };

    createPaymentIntent();
  }, [totalAmount]); // ✅ Removed errorMessage from dependencies

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]); // ✅ Moved toast.error() to its own useEffect

  if (errorMessage) return <div className="text-red-500">Error: {errorMessage}</div>;
  if (!clientSecret) return <div>Loading payment details...</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Complete your Payment</h2>
        <PaymentForm clientSecret={clientSecret} />
      </div>
    </Elements>
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (paymentSuccess) {
      router.push(`/success`);
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

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: fullName, email },
      },
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else if (paymentIntent?.status === 'succeeded') {
      toast.success('Payment succeeded!');
      setPaymentSuccess(true);
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
        onChange={(e) => setFullName(e.target.value)}
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
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

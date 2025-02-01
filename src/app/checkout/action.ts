"use server";

import Stripe from "stripe";

export async function createPaymentIntent(amount: number) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
     // Optional, use the latest stable version
  });

  try {
    // Create a PaymentIntent with the total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
}

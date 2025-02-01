import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // Ensure this is the latest Stripe API version
});

export async function createPaymentIntent(amount: number) {
  try {
    // Create a payment intent with the provided amount (in cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 2000 for $20)
      currency: 'usd',
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

import { NextResponse } from "next/server";
import Stripe from "stripe";

// Ensure your Stripe secret key is loaded
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    console.log("Received items:", items); // Log received items

    // Validate received items
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items received:", items);
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Stripe session created:", session.url);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

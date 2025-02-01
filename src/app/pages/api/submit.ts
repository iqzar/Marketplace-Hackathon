import { NextResponse, NextRequest } from "next/server";
import { client } from "../../../sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json();

    // Validate request body
    if (!orderData.firstName || !orderData.lastName || !orderData.address || !orderData.products) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    // Ensure token is being used
    const sanityToken = process.env.SANITY_API_TOKEN;
    if (!sanityToken) {
      console.error("Sanity API token is missing.");
      return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    // Manually send a request to Sanity to verify authentication
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: "order",
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                address: orderData.address,
                products: orderData.products,
                orderDate: orderData.orderDate || new Date().toISOString(),
                totalAmount: orderData.totalAmount,
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Sanity API Error:", errorData);
      return NextResponse.json({ message: "Sanity API error", error: errorData }, { status: response.status });
    }

    return NextResponse.json({ message: "Order submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting order:", error);
    return NextResponse.json({ message: "Failed to submit the order.", error: error }, { status: 500 });
  }
}
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutButton({ items }: { items: Item[] }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      }
    } catch (error) {
      toast.error("Checkout failed");
      console.error("Checkout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-600 text-white px-6 py-2 rounded"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}

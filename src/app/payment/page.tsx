import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "./loading"; // Create a loading skeleton

const PaymentClient = dynamic(() => import("./paymentClient"), { ssr: false });

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentClient />
    </Suspense>
  );
}

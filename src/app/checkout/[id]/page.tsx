"use client";

import { use } from "react";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getFeed } from "@/features/feed/api/getFeed";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  // In a real app we'd fetch the specific product/startup by ID.
  // Use a unique query key so it doesn't collide with the useInfiniteQuery cache on the home page
  const { data } = useQuery({
    queryKey: ["checkout-feed", "consumer", resolvedParams.id],
    queryFn: () => getFeed(0, "consumer"),
  });

  const item = data?.items?.find((i) => i.id === resolvedParams.id) || {
    startupName: "Unknown Startup",
    oneLiner: "Product Title",
    price: "$149",
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-black">
      {/* Left Panel: Product/Order Summary (Dark) */}
      <div className="w-full lg:w-[45%] xl:w-1/2 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden flex flex-col">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent pointer-events-none" />

        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Feed
        </Link>

        <div className="flex-1 flex flex-col justify-center relative z-10">
          <OrderSummary
            startupName={item.startupName}
            productName={item.oneLiner}
            price={item.price || "$149"}
          />
        </div>
      </div>

      {/* Right Panel: Checkout Form (Slightly lighter/frosted) */}
      <div className="w-full lg:w-[55%] xl:w-1/2 bg-[#0A0A0A] p-6 md:p-12 relative flex flex-col justify-center overflow-y-auto">
        <CheckoutForm />
      </div>
    </div>
  );
}

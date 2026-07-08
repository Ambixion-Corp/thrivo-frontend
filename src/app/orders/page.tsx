"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Package, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockOrders = [
  {
    id: "ORD-7X9B2",
    date: "Aug 12, 2026",
    startup: "Venture 1",
    product: "Early Access: Hardware Beta",
    amount: "$149.00",
    status: "Processing",
  },
  {
    id: "ORD-3F8M1",
    date: "Jul 28, 2026",
    startup: "Venture 4",
    product: "Pro Subscription (Annual)",
    amount: "$240.00",
    status: "Delivered",
  },
];

function OrdersContent() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "true";

  return (
    <div className="min-h-screen w-full bg-black/95 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-10 pb-24">
        {showSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-bold">Payment Successful!</p>
              <p className="text-sm opacity-80">
                Your order has been placed and a receipt has been sent to your
                email.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30">
            <Package className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Orders
            </span>
          </h1>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden shrink-0 hidden sm:block">
                  <Image
                    src="/feed-placeholder.png"
                    alt="Product"
                    fill
                    className="object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-white">
                      {order.id}
                    </span>
                    <span className="text-xs text-zinc-500">{order.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {order.product}
                  </h3>
                  <Link
                    href={`/startups/2`}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    By {order.startup}
                  </Link>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                <div className="text-xl font-extrabold text-white">
                  {order.amount}
                </div>
                <div className="flex gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      order.status === "Processing"
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    {order.status}
                  </span>
                  <button className="p-1 text-zinc-500 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black/95 flex items-center justify-center text-zinc-500">
          Loading...
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}

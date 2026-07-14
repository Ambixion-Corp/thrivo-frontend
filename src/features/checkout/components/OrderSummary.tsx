"use client";

import { CheckCircle2, Package, Truck, Zap } from "lucide-react";
import Image from "next/image";

interface OrderSummaryProps {
  startupName: string;
  productName: string;
  price: string;
  imageUrl?: string;
}

export function OrderSummary({
  startupName,
  productName,
  price,
}: OrderSummaryProps) {
  // Mock calculations
  const priceNum = parseFloat(price.replace(/[$,]/g, ""));
  const tax = priceNum * 0.08;
  const total = priceNum + tax;

  return (
    <div className="w-full max-w-lg mx-auto p-8 flex flex-col justify-center h-full">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
          <Package className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {startupName}
          </p>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Order Summary
          </h2>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden mb-8 backdrop-blur-sm relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="aspect-video w-full relative bg-black/50 border-b border-white/5">
          {/* Fallback pattern if no image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Zap className="w-24 h-24 text-purple-500" />
          </div>
          <Image
            src="/feed-placeholder.png"
            alt={productName}
            fill
            className="object-cover opacity-80"
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2">{productName}</h3>
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
            <Truck className="w-4 h-4" /> Ships in 3-5 business days
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white">${priceNum.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-white">Free</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Estimated Tax</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/50 border-t border-white/10 flex justify-between items-center">
          <span className="font-semibold text-zinc-400">Total Due</span>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-center text-xs text-zinc-500 font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        Backed by Thrivo Buyer Protection
      </div>
    </div>
  );
}

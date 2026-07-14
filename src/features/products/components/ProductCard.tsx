"use client";

import { Product } from "../types";
import { ShoppingCart, Star, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    if (isAdded || isAdding) return;

    setIsAdding(true);
    // Simulate network delay for adding to cart
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);

      // Reset after 3 seconds
      setTimeout(() => setIsAdded(false), 3000);
    }, 800);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 relative"
    >
      {/* Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/50 p-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 relative z-20 bg-[#0A0A0A]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-sm font-bold text-[#00C6D8] mb-1">
              {product.startupName}
            </p>
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#8DEE5F] transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10 shrink-0">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-white">
              {product.averageRating}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-400 font-medium line-clamp-2 flex-1 mb-6">
          {product.tagline}
        </p>

        {/* Footer Area: Price & Quick Add */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div>
            <span className="text-2xl font-extrabold text-white">
              $
              {product.basePrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding || isAdded}
            className={`relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-auto sm:px-4 rounded-xl font-bold transition-all ${
              isAdded
                ? "bg-[#8DEE5F]/20 text-[#8DEE5F] border border-[#8DEE5F]/50"
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            {isAdding ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
              </motion.div>
            ) : isAdded ? (
              <>
                <Check className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

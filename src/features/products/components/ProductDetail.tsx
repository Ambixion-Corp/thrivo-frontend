"use client";

import { useState } from "react";
import { Product } from "../types";
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.id || "",
  );

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0];
  const price = activeVariant ? activeVariant.price : product.basePrice;

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12">
      {/* Product Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00C6D8]" />
              {product.category}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-[#00C6D8] shadow-[0_0_15px_rgba(0,198,216,0.3)]"
                      : "border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00C6D8]">
                By {product.startupName}
              </span>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {product.averageRating}
                <span className="text-zinc-500 font-normal">
                  ({product.totalSales.toLocaleString()} sold)
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg text-zinc-300 font-medium leading-relaxed">
              {product.tagline}
            </p>
          </div>

          <div className="text-3xl font-black text-white flex items-baseline gap-2">
            ${price.toLocaleString()}
            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
              {product.currency}
            </span>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest">
                Select Edition / Variant
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedVariant === v.id
                        ? "bg-[#00C6D8]/10 border-[#00C6D8] text-white shadow-[0_0_20px_rgba(0,198,216,0.15)]"
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{v.name}</div>
                    <div className="text-xs text-[#8DEE5F] font-semibold mt-0.5">
                      ${v.price.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checkout CTA */}
          <div className="space-y-4 pt-4">
            <Link
              href={`/products/${product.id}/checkout`}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-base flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,198,216,0.4)] transition-all active:scale-[0.99]"
            >
              <ShoppingBag className="w-5 h-5" /> Buy Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#00C6D8]" />
                Free Global Express Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8DEE5F]" />
                Thrivo Escrow & Buyer Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Product Specifications & Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.features.map((feat) => (
            <div
              key={feat}
              className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/5"
            >
              <div className="w-6 h-6 rounded-full bg-[#8DEE5F]/20 text-[#8DEE5F] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold text-zinc-200">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

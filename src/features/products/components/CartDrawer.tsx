"use client";

import {
  useCartStore,
  selectSubtotal,
  selectTotalItems,
} from "@/store/cartStore";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const totalItems = selectTotalItems({ items } as never);
  const subtotal = selectSubtotal({ items } as never);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C6D8]/20 to-[#8DEE5F]/20 flex items-center justify-center border border-white/10">
                    <ShoppingBag className="w-5 h-5 text-[#00C6D8]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Your Cart
                    </h2>
                    <p className="text-xs text-zinc-400 font-medium">
                      {totalItems} {totalItems === 1 ? "item" : "items"} from
                      startup founders
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">
                        Your cart is empty
                      </p>
                      <p className="text-xs text-zinc-400 max-w-xs mt-1">
                        Explore innovative products launched by builders across
                        the Thrivo ecosystem.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      onClick={closeDrawer}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-xs hover:shadow-[0_0_20px_rgba(0,198,216,0.3)] transition-all"
                    >
                      Browse Marketplace
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex gap-4 group hover:border-zinc-700 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00C6D8] uppercase tracking-wider mb-0.5">
                            <Building className="w-3 h-3" />
                            {item.startupName}
                          </div>
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.name}
                          </h4>
                          {item.variantName && (
                            <p className="text-xs text-zinc-400 font-medium">
                              {item.variantName}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/80">
                          <span className="text-sm font-extrabold text-white">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-black border border-zinc-800 rounded-lg p-0.5">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 rounded-md hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 rounded-md hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Platform Escrow Fee</span>
                      <span className="text-[#8DEE5F] font-semibold">FREE</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                      <span>Total</span>
                      <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-[#8DEE5F] shrink-0" />
                    <span>Protected by Thrivo Escrow Buyer Guarantee.</span>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/checkout"
                      onClick={closeDrawer}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,198,216,0.35)] transition-all active:scale-[0.99]"
                    >
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

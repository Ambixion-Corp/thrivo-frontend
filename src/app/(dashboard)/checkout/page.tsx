"use client";

import { useState } from "react";
import {
  useCartStore,
  selectSubtotal,
  selectTotalItems,
} from "@/store/cartStore";
import { useOrderStore, PlacedOrder } from "@/store/orderStore";
import { useNotificationStore } from "@/store/notificationStore";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Building,
  CreditCard,
  ShoppingBag,
  Truck,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function generateOrderId() {
  return `THR-${Date.now().toString().slice(-6)}`;
}

function generateTrackingNumber() {
  return `TRV-${(Date.now() % 100000).toString().padStart(5, "0")}-US`;
}

function generateContractHash() {
  return `0x${(Date.now().toString(16) + "89f2a781b2c4e8039d91fca2980e14c93a772b11").slice(0, 40)}`;
}

export default function MultiItemCheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const subtotal = selectSubtotal({ items } as never);
  const totalItems = selectTotalItems({ items } as never);

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = (formData.get("fullName") as string) || "Alex Johnson";
    const email =
      (formData.get("email") as string) || "alex.johnson@example.com";
    const phone = (formData.get("phone") as string) || "+1 (555) 019-2834";
    const address =
      (formData.get("address") as string) || "500 Howard Street, Suite 400";
    const city = (formData.get("city") as string) || "San Francisco";
    const state = (formData.get("state") as string) || "CA";
    const zip = (formData.get("zip") as string) || "94105";

    const generatedId = generateOrderId();
    setOrderId(generatedId);

    const placedOrder: PlacedOrder = {
      id: generatedId,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      tax: 0,
      shipping: 0,
      total: subtotal,
      status: "Processing",
      escrowContractId: generateContractHash(),
      trackingNumber: generateTrackingNumber(),
      carrier: "FedEx Express Escrow Priority",
      shippingDetails: {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        zip,
      },
    };

    setTimeout(() => {
      addOrder(placedOrder);
      useNotificationStore.getState().addNotification({
        category: "orders",
        title: "Escrow Order Placed",
        message: `Payment of $${subtotal.toLocaleString()} locked in Thrivo Escrow Protection for order #${generatedId}.`,
        link: "/orders",
        actorName: fullName,
      });
      setIsProcessing(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#8DEE5F]/20 text-[#8DEE5F] border border-[#8DEE5F]/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C6D8]">
              Escrow Order Verified
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Order Confirmed!
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Order reference:{" "}
              <span className="font-mono text-white font-bold">{orderId}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-300 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Total Paid:</span>
              <span className="text-white font-bold">
                ${subtotal.toLocaleString()} USD
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Escrow Status:</span>
              <span className="text-[#8DEE5F] font-bold">Held in Vault</span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
              Funds will only be released to startup founders after carrier
              delivery is confirmed.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/products"
              className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm hover:shadow-[0_0_20px_rgba(0,198,216,0.3)] transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="block w-full py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-sm text-zinc-400 max-w-sm">
          You don&apos;t have any products in your cart yet. Explore tech
          innovations from verified startup founders.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 max-w-6xl mx-auto px-4 sm:px-6">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items & Totals */}
        <div className="lg:col-span-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Order Summary
              </h2>
              <p className="text-xs text-zinc-400">
                {totalItems} items across{" "}
                {new Set(items.map((i) => i.startupName)).size} startups
              </p>
            </div>
            <span className="text-xs font-bold text-[#8DEE5F] bg-[#8DEE5F]/10 border border-[#8DEE5F]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protected
            </span>
          </div>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-black/40 border border-white/5"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#00C6D8] uppercase tracking-wider">
                    <Building className="w-3 h-3" />
                    {item.startupName}
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">
                    {item.name}
                  </h4>
                  {item.variantName && (
                    <p className="text-xs text-zinc-400">{item.variantName}</p>
                  )}
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Qty: {item.quantity} × ${item.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-white">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-800 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white font-semibold">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#00C6D8]" /> Express
                Shipping
              </span>
              <span className="text-[#8DEE5F] font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Escrow Processing Fee</span>
              <span className="text-[#8DEE5F] font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between text-lg font-black text-white pt-3 border-t border-zinc-800">
              <span>Total Amount</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F]">
                ${subtotal.toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>

        {/* Right: Shipping & Checkout Form */}
        <div className="lg:col-span-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#00C6D8]" /> Shipping &
              Payment
            </h2>
            <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
              <Lock className="w-3.5 h-3.5 text-[#8DEE5F]" /> 256-Bit SSL
            </div>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                type="text"
                defaultValue="Alex Johnson"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  defaultValue="alex.johnson@example.com"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  defaultValue="+1 (555) 019-2834"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
              >
                Shipping Address
              </label>
              <input
                id="address"
                name="address"
                required
                type="text"
                defaultValue="500 Howard Street, Suite 400"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  type="text"
                  defaultValue="San Francisco"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                >
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  required
                  type="text"
                  defaultValue="CA"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5"
                >
                  ZIP Code
                </label>
                <input
                  id="zip"
                  name="zip"
                  required
                  type="text"
                  defaultValue="94105"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
            </div>

            {/* Payment simulation */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Payment Method (Escrow Vault)
              </label>
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <CreditCard className="w-4 h-4 text-[#00C6D8]" />
                    <span>Card ending in 4242</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    Exp 12/28
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Your funds are secured in the Thrivo Escrow smart contract and
                  will not be transferred to the sellers until all items are
                  delivered.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,198,216,0.4)] transition-all active:scale-[0.99] disabled:opacity-50 mt-4"
            >
              {isProcessing ? (
                <span>Securing in Escrow...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Place Order ( $
                  {subtotal.toLocaleString()})
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard, Lock, ShieldCheck } from "lucide-react";

export function CheckoutForm() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMethod, setActiveMethod] = useState<"card" | "apple_pay">(
    "card",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network latency for payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Route to the new orders page as requested by the user
      router.push("/orders?success=true");
    }, 2500);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Complete your purchase
        </h2>
        <p className="text-sm text-zinc-400 mt-2 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" /> All transactions are secure and
          encrypted.
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveMethod("card")}
          className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
            activeMethod === "card"
              ? "bg-white/10 border-white/20 text-white"
              : "bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <CreditCard className="w-5 h-5" /> Card
        </button>
        <button
          onClick={() => setActiveMethod("apple_pay")}
          className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
            activeMethod === "apple_pay"
              ? "bg-white/10 border-white/20 text-white"
              : "bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {/* Using a simple custom SVG path for Apple logo mimic */}
          <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Pay
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                Card Information
              </label>
              <div className="border border-white/10 rounded-xl overflow-hidden bg-black/50">
                <input
                  type="text"
                  placeholder="Card number"
                  defaultValue="4242 4242 4242 4242"
                  className="w-full bg-transparent px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none border-b border-white/5"
                  required
                />
                <div className="flex">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    defaultValue="12 / 28"
                    className="w-1/2 bg-transparent px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none border-r border-white/5"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    defaultValue="123"
                    className="w-1/2 bg-transparent px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="Name on card"
                defaultValue="Jane Doe"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                Shipping Address
              </label>
              <textarea
                rows={2}
                defaultValue="123 Startup Blvd, Suite 400&#10;San Francisco, CA 94105"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                required
              />
            </div>
          </div>
        )}

        {activeMethod === "apple_pay" && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <p className="text-zinc-400 font-medium">
              Apple Pay is ready.
              <br />
              Click below to authorize payment.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isProcessing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Pay $149.00"
          )}
        </button>
      </form>
    </div>
  );
}

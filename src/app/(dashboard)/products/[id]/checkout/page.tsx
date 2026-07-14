import { CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductCheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="py-12 w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <Link
          href={`/products/${id}`}
          className="text-sm font-bold text-zinc-500 hover:text-white transition-colors"
        >
          ← Back to Product
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-8">
            Checkout
          </h1>

          <div className="space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Contact Information
              </h3>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Payment Details
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full bg-black border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Pay Securely
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
              <div className="w-20 h-20 bg-black rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden relative">
                <Image
                  src="/startup_feed_1.png"
                  alt="Product"
                  fill
                  className="object-cover opacity-50"
                />
              </div>
              <div>
                <h4 className="font-bold text-white">
                  Thrivo Pro Subscription
                </h4>
                <p className="text-sm text-zinc-400">Annual Plan</p>
                <p className="font-bold text-white mt-1">$299.00</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-zinc-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white font-medium">$299.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Taxes</span>
                <span className="text-white font-medium">
                  Calculated at next step
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-lg">Total</span>
              <span className="font-bold text-purple-400 text-2xl">
                $299.00
              </span>
            </div>

            <div className="mt-8 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
              <p className="text-xs text-purple-300 leading-relaxed">
                By purchasing, you agree to Thrivo&apos;s Terms of Service and
                Privacy Policy. Direct-from-feed purchases route 100% of funds
                to the founder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

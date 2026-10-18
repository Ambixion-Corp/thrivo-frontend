"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import {
  Package,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Search,
  Printer,
  X,
  Copy,
  Check,
  ChevronRight,
  Building,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useOrderStore, PlacedOrder, OrderStatus } from "@/store/orderStore";
import { useNotificationStore } from "@/store/notificationStore";

function InvoiceModal({
  order,
  isOpen,
  onClose,
}: {
  order: PlacedOrder;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(order.escrowContractId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] flex items-center justify-center font-black text-black text-sm">
                T
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                THRIVO
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Decentralized Startup Marketplace & Escrow Vault
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C6D8] block">
              Official Invoice
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {order.id}
            </span>
            <p className="text-xs text-zinc-400 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Buyer & Escrow Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-zinc-500 font-bold uppercase tracking-wider block">
              Billed & Shipped To
            </span>
            <p className="font-bold text-white">
              {order.shippingDetails.fullName}
            </p>
            <p className="text-zinc-400">{order.shippingDetails.address}</p>
            <p className="text-zinc-400">
              {order.shippingDetails.city}, {order.shippingDetails.state}{" "}
              {order.shippingDetails.zip}
            </p>
            <p className="text-zinc-500 pt-1">
              {order.shippingDetails.email} • {order.shippingDetails.phone}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-zinc-500 font-bold uppercase tracking-wider block">
              Escrow Security Vault
            </span>
            <p className="text-zinc-400">
              Status:{" "}
              <span
                className={`font-bold ${order.status === "Completed" ? "text-[#8DEE5F]" : "text-[#00C6D8]"}`}
              >
                {order.status === "Completed"
                  ? "Funds Released to Founder"
                  : "Secured in Escrow Vault"}
              </span>
            </p>
            <p className="text-zinc-400">
              Carrier:{" "}
              <span className="text-white font-semibold">{order.carrier}</span>
            </p>
            <p className="text-zinc-400">
              Tracking:{" "}
              <span className="font-mono text-white">
                {order.trackingNumber}
              </span>
            </p>
            <div className="pt-1 flex items-center gap-1">
              <span className="text-[10px] text-zinc-500 truncate max-w-[170px] font-mono">
                {order.escrowContractId}
              </span>
              <button
                onClick={handleCopyHash}
                className="text-zinc-400 hover:text-white"
                title="Copy Escrow Hash"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-[#8DEE5F]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="border border-zinc-800 rounded-2xl overflow-hidden text-xs">
          <div className="bg-zinc-900/60 p-3 grid grid-cols-12 font-bold text-zinc-400 uppercase tracking-wider">
            <div className="col-span-6">Item</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          <div className="divide-y divide-zinc-800/60">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 grid grid-cols-12 items-center text-zinc-300"
              >
                <div className="col-span-6 pr-2">
                  <p className="font-bold text-white truncate">{item.name}</p>
                  <p className="text-[11px] text-zinc-500">
                    Startup: {item.startupName}{" "}
                    {item.variantName ? `• ${item.variantName}` : ""}
                  </p>
                </div>
                <div className="col-span-2 text-center font-mono">
                  {item.quantity}
                </div>
                <div className="col-span-2 text-right font-mono">
                  ${item.price.toLocaleString()}
                </div>
                <div className="col-span-2 text-right font-bold text-white font-mono">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Breakdown */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Subtotal</span>
            <span className="font-mono text-white">
              ${order.subtotal.toLocaleString()} USD
            </span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Shipping</span>
            <span className="text-[#8DEE5F] font-bold">FREE</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Escrow Buyer Protection Fee</span>
            <span className="text-[#8DEE5F] font-bold">INCLUDED ($0.00)</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-zinc-800">
            <span>Total Paid</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] font-mono">
              ${order.total.toLocaleString()} USD
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ReleaseEscrowModal({
  order,
  isOpen,
  onClose,
  onConfirm,
}: {
  order: PlacedOrder;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleRelease = async () => {
    setIsConfirming(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsConfirming(false);
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00C6D8]/20 to-[#8DEE5F]/20 text-[#8DEE5F] border border-[#8DEE5F]/30 flex items-center justify-center">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00C6D8]">
            Thrivo Buyer Protection
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Release Escrow Funds?
          </h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            By releasing funds, you confirm that you have safely received all
            items for order{" "}
            <span className="font-mono text-white font-bold">{order.id}</span>.
            The escrow vault will transfer{" "}
            <span className="text-[#8DEE5F] font-bold">
              ${order.total.toLocaleString()} USD
            </span>{" "}
            directly to the startup founder&apos;s verified account.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-zinc-300 space-y-2 font-mono">
          <div className="flex justify-between">
            <span className="text-zinc-500">Contract:</span>
            <span className="truncate max-w-[180px]">
              {order.escrowContractId}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Items:</span>
            <span className="text-white">
              {order.items.reduce((acc, i) => acc + i.quantity, 0)} Units
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRelease}
            disabled={isConfirming}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-xs hover:shadow-[0_0_20px_rgba(0,198,216,0.4)] transition-all disabled:opacity-50"
          >
            {isConfirming ? "Releasing..." : "Confirm & Release"}
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "true";

  const { orders, releaseEscrow, updateOrderStatus } = useOrderStore();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeInvoiceOrder, setActiveInvoiceOrder] =
    useState<PlacedOrder | null>(null);
  const [activeReleaseOrder, setActiveReleaseOrder] =
    useState<PlacedOrder | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter =
        selectedFilter === "All" || order.status === selectedFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.items.some(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.startupName.toLowerCase().includes(q),
        );

      return matchesFilter && matchesQuery;
    });
  }, [orders, selectedFilter, searchQuery]);

  const handleReleaseSuccess = (orderId: string) => {
    releaseEscrow(orderId);
    useNotificationStore.getState().addNotification({
      category: "orders",
      title: "Escrow Funds Released",
      message: `Buyer confirmed delivery for ${orderId}. Escrow vault has released funds to the startup founder.`,
      link: "/orders",
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Processing":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Processing
          </span>
        );
      case "Shipped":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
            <Truck className="w-3 h-3" />
            Shipped
          </span>
        );
      case "Delivered":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00C6D8]/10 text-[#00C6D8] border border-[#00C6D8]/30 flex items-center gap-1.5">
            <Package className="w-3 h-3" />
            Delivered
          </span>
        );
      case "Completed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8DEE5F]/10 text-[#8DEE5F] border border-[#8DEE5F]/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
            {status}
          </span>
        );
    }
  };

  const getStepState = (
    currentStatus: OrderStatus,
    step: "created" | "processing" | "shipped" | "delivered" | "completed",
  ) => {
    const orderRanks: Record<OrderStatus, number> = {
      Processing: 1,
      Shipped: 2,
      Delivered: 3,
      Completed: 4,
      Disputed: 1,
    };
    const stepRanks = {
      created: 0,
      processing: 1,
      shipped: 2,
      delivered: 3,
      completed: 4,
    };

    const currentRank = orderRanks[currentStatus] ?? 1;
    const thisRank = stepRanks[step];

    if (currentRank > thisRank) return "completed";
    if (currentRank === thisRank) return "active";
    return "pending";
  };

  return (
    <div className="min-h-screen w-full bg-black/95 p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pb-24">
        {showSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-bold">Payment Secured in Escrow Vault!</p>
              <p className="text-xs opacity-80 mt-0.5">
                Your order is processing. Payment is safely held by Thrivo
                Escrow Protection until you confirm delivery.
              </p>
            </div>
          </div>
        )}

        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30">
              <Package className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  Orders
                </span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Track marketplace shipments, review escrow receipts, and release
                founder payouts
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs transition-colors self-start sm:self-auto flex items-center gap-2"
          >
            Browse Marketplace <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900/80 border border-zinc-800 w-full sm:w-auto overflow-x-auto">
            {["All", "Processing", "Shipped", "Delivered", "Completed"].map(
              (filter) => {
                const count =
                  filter === "All"
                    ? orders.length
                    : orders.filter((o) => o.status === filter).length;
                const isActive = selectedFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? "bg-white text-black shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>{filter}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-black/20 text-black"
                          : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              },
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00C6D8] transition-colors"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/80 space-y-4">
              <Package className="w-12 h-12 text-zinc-600 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-white">
                  No orders found
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  {searchQuery
                    ? "Try adjusting your search criteria."
                    : "You haven't placed any orders in this category yet."}
                </p>
              </div>
              <Link
                href="/products"
                className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-bold text-xs"
              >
                Discover Tech Products
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const totalItems = order.items.reduce(
                (sum, i) => sum + i.quantity,
                0,
              );

              return (
                <div
                  key={order.id}
                  className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-white/10 transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/70">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-base font-extrabold text-white">
                        {order.id}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        • {totalItems} {totalItems === 1 ? "item" : "items"}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-500 block uppercase font-bold tracking-wider">
                          Total Amount
                        </span>
                        <span className="text-lg font-black text-white font-mono">
                          ${order.total.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Escrow Banner */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`w-4 h-4 shrink-0 ${order.status === "Completed" ? "text-[#8DEE5F]" : "text-[#00C6D8]"}`}
                      />
                      <span className="text-zinc-300 font-medium">
                        {order.status === "Completed" ? (
                          <>
                            Escrow Completed: Funds released on{" "}
                            <span className="font-mono text-white">
                              {new Date(
                                order.escrowReleasedAt || order.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </>
                        ) : (
                          <>
                            Funds held securely in{" "}
                            <span className="text-[#00C6D8] font-bold">
                              Thrivo Escrow Vault
                            </span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                      <span>Contract:</span>
                      <span className="text-zinc-500 truncate max-w-[120px]">
                        {order.escrowContractId}
                      </span>
                    </div>
                  </div>

                  {/* Lifecycle Stepper */}
                  <div className="py-2">
                    <div className="grid grid-cols-5 gap-2 relative">
                      {[
                        { key: "created", label: "Paid & Escrowed" },
                        { key: "processing", label: "Processing" },
                        { key: "shipped", label: "Shipped" },
                        { key: "delivered", label: "Delivered" },
                        { key: "completed", label: "Escrow Released" },
                      ].map((step, idx) => {
                        const stepState = getStepState(
                          order.status,
                          step.key as never,
                        );

                        return (
                          <div
                            key={step.key}
                            className="flex flex-col items-center text-center space-y-1.5"
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                stepState === "completed"
                                  ? "bg-[#8DEE5F] text-black"
                                  : stepState === "active"
                                    ? "bg-[#00C6D8] text-black ring-4 ring-[#00C6D8]/20"
                                    : "bg-zinc-800 text-zinc-500"
                              }`}
                            >
                              {stepState === "completed" ? (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              ) : (
                                idx + 1
                              )}
                            </div>
                            <span
                              className={`text-[10px] font-semibold leading-tight ${
                                stepState === "completed" ||
                                stepState === "active"
                                  ? "text-zinc-200"
                                  : "text-zinc-500"
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 pt-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/60"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden shrink-0">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 m-auto text-zinc-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                              <span className="flex items-center gap-1 text-[#00C6D8]">
                                <Building className="w-3 h-3" />
                                {item.startupName}
                              </span>
                              {item.variantName && (
                                <span>• {item.variantName}</span>
                              )}
                              <span>• Qty: {item.quantity}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-white font-mono">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-zinc-800/70">
                    <div className="text-xs text-zinc-400 space-y-0.5">
                      <p>
                        Carrier:{" "}
                        <span className="text-white font-medium">
                          {order.carrier}
                        </span>{" "}
                        ({order.trackingNumber})
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate max-w-sm">
                        Ships to: {order.shippingDetails.fullName} •{" "}
                        {order.shippingDetails.city},{" "}
                        {order.shippingDetails.state}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Demo State Simulators (For reviewer demonstration) */}
                      {order.status === "Processing" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "Shipped")}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-semibold border border-white/5 transition-colors"
                        >
                          Simulate Ship
                        </button>
                      )}
                      {order.status === "Shipped" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Delivered")
                          }
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-semibold border border-white/5 transition-colors"
                        >
                          Simulate Delivery
                        </button>
                      )}

                      {/* Prominent Escrow Release Action */}
                      {order.status === "Delivered" && (
                        <button
                          onClick={() => setActiveReleaseOrder(order)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-xs hover:shadow-[0_0_20px_rgba(0,198,216,0.3)] transition-all flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-4 h-4" /> Release Escrow
                          Funds
                        </button>
                      )}

                      {/* Invoice Receipt Modal Trigger */}
                      <button
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" /> Invoice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          isOpen={Boolean(activeInvoiceOrder)}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}

      {/* Release Escrow Modal */}
      {activeReleaseOrder && (
        <ReleaseEscrowModal
          order={activeReleaseOrder}
          isOpen={Boolean(activeReleaseOrder)}
          onClose={() => setActiveReleaseOrder(null)}
          onConfirm={() => handleReleaseSuccess(activeReleaseOrder.id)}
        />
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black/95 flex items-center justify-center text-zinc-500">
          Loading orders...
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}

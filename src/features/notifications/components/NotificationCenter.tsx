"use client";

import { useState } from "react";
import {
  useNotificationStore,
  selectUnreadCount,
  NotificationCategory,
} from "@/store/notificationStore";
import {
  Bell,
  ShieldCheck,
  CircleDollarSign,
  ShoppingBag,
  MessageSquare,
  Users,
  CheckCheck,
  Trash2,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import Link from "next/link";

type TabFilter = "all" | "unread" | NotificationCategory;

export function NotificationCenter() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotificationStore();

  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  const unreadCount = selectUnreadCount({ notifications });

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.category === activeTab;
  });

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case "security":
        return <ShieldCheck className="w-5 h-5 text-[#8DEE5F]" />;
      case "deals":
        return <CircleDollarSign className="w-5 h-5 text-[#00C6D8]" />;
      case "orders":
        return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case "messages":
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case "network":
        return <Users className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getCategoryBadgeClass = (category: NotificationCategory) => {
    switch (category) {
      case "security":
        return "bg-[#8DEE5F]/10 text-[#8DEE5F] border-[#8DEE5F]/20";
      case "deals":
        return "bg-[#00C6D8]/10 text-[#00C6D8] border-[#00C6D8]/20";
      case "orders":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "messages":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "network":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
  };

  return (
    <div className="py-8 w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00C6D8]/20 to-[#8DEE5F]/20 flex items-center justify-center border border-white/10 relative">
            <Bell className="w-6 h-6 text-[#00C6D8]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8DEE5F] text-[9px] font-black text-black shadow-md">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ecosystem Activity
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">
              Real-time updates across deals, security NDAs, and consumer orders
            </p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 hover:text-white transition-colors border border-white/10 flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5 text-[#00C6D8]" /> Mark all
              read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-xs font-semibold text-zinc-500 hover:text-red-400 transition-colors border border-white/10"
              title="Clear all notifications"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
        <Filter className="w-4 h-4 text-zinc-500 shrink-0 hidden sm:inline mr-1" />
        {[
          { id: "all", label: "All Activity" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "deals", label: "Deals & Pipeline" },
          { id: "security", label: "Security & NDAs" },
          { id: "orders", label: "Marketplace Orders" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabFilter)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-white/15 text-white border border-white/20 shadow-md"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-zinc-900/30 border border-dashed border-zinc-800 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 mx-auto">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-white">
              No notifications found
            </p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              There is no recorded activity under this filter category at this
              time.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                notif.read
                  ? "bg-zinc-900/40 border-zinc-800/80 opacity-80"
                  : "bg-zinc-900/80 border-white/10 shadow-[0_0_20px_rgba(0,198,216,0.05)]"
              }`}
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(
                        notif.category,
                      )}`}
                    >
                      {notif.category}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#00C6D8] shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {notif.message}
                  </p>

                  <p className="text-[11px] text-zinc-500 font-medium">
                    {notif.timestamp}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Link
                  href={notif.link}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-bold text-white border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  View Details <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notif.id);
                  }}
                  className="p-2 text-zinc-600 hover:text-red-400 transition-colors"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

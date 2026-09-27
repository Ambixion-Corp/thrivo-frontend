"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  CircleDollarSign,
  ShieldCheck,
  ShoppingBag,
  MessageSquare,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  useNotificationStore,
  selectUnreadCount,
  NotificationCategory,
} from "@/store/notificationStore";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();
  const unreadCount = selectUnreadCount({ notifications });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getIcon = (category: NotificationCategory) => {
    switch (category) {
      case "deals":
        return <CircleDollarSign className="w-4 h-4 text-[#00C6D8]" />;
      case "security":
        return <ShieldCheck className="w-4 h-4 text-[#8DEE5F]" />;
      case "orders":
        return <ShoppingBag className="w-4 h-4 text-amber-400" />;
      case "messages":
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case "network":
        return <Users className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getGradient = (category: NotificationCategory) => {
    switch (category) {
      case "deals":
        return "from-[#00C6D8]/20 to-blue-500/20 border-[#00C6D8]/30";
      case "security":
        return "from-[#8DEE5F]/20 to-emerald-400/20 border-[#8DEE5F]/30";
      case "orders":
        return "from-amber-500/20 to-orange-400/20 border-amber-500/30";
      case "messages":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/30";
      case "network":
        return "from-indigo-500/20 to-blue-400/20 border-indigo-500/30";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative -m-2.5 p-2.5 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span className="sr-only">View notifications</span>
        <Bell
          className="h-6 w-6 group-hover:scale-110 transition-transform"
          aria-hidden="true"
        />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8DEE5F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8DEE5F]"></span>
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 sm:w-96 rounded-3xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#00C6D8]/20 text-[#00C6D8] font-mono text-[10px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                You have no new notifications.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {notifications.slice(0, 5).map((notif) => (
                  <Link
                    key={notif.id}
                    href={notif.link}
                    onClick={() => {
                      markAsRead(notif.id);
                      setIsOpen(false);
                    }}
                    className={`block p-4 hover:bg-white/[0.04] transition-colors relative group ${
                      notif.read ? "opacity-70" : ""
                    }`}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00C6D8]" />
                    )}

                    <div className="flex gap-3.5 items-start pl-1">
                      <div
                        className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-tr border ${getGradient(
                          notif.category,
                        )}`}
                      >
                        {getIcon(notif.category)}
                      </div>
                      <div className="flex-1 space-y-0.5 min-w-0">
                        <p className="text-xs font-bold text-white truncate">
                          {notif.title}
                        </p>
                        <p className="text-xs leading-snug text-zinc-300 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] font-medium text-zinc-500 pt-0.5">
                          {notif.timestamp}
                        </p>
                      </div>
                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 bg-white/[0.02]">
            <Link
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-xs font-bold text-[#00C6D8] hover:text-[#8DEE5F] transition-colors py-1.5"
            >
              View All Ecosystem Activity →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Briefcase, DollarSign, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Notification = {
  id: string;
  type: "network" | "creator" | "founder";
  message: string;
  time: string;
  read: boolean;
  link: string;
};

const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    type: "network",
    message: "Sarah Jenkins accepted your introduction.",
    time: "2m ago",
    read: false,
    link: "/network",
  },
  {
    id: "notif_2",
    type: "creator",
    message: "Your affiliate link generated a new sale ($50 bounty).",
    time: "1h ago",
    read: false,
    link: "/affiliates",
  },
  {
    id: "notif_3",
    type: "founder",
    message: "A new investor viewed your pitch deck.",
    time: "3h ago",
    read: true,
    link: "/startups",
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "network":
        return <Users className="w-4 h-4 text-purple-400" />;
      case "creator":
        return <DollarSign className="w-4 h-4 text-[#8DEE5F]" />;
      case "founder":
        return <Briefcase className="w-4 h-4 text-[#00C6D8]" />;
    }
  };

  const getGradient = (type: Notification["type"]) => {
    switch (type) {
      case "network":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/30";
      case "creator":
        return "from-[#8DEE5F]/20 to-emerald-400/20 border-[#8DEE5F]/30";
      case "founder":
        return "from-[#00C6D8]/20 to-blue-500/20 border-[#00C6D8]/30";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }
        }}
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
        <div className="absolute right-0 mt-4 w-80 sm:w-96 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                You have no new notifications.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    href={notif.link}
                    onClick={() => setIsOpen(false)}
                    className={`block p-4 hover:bg-white/[0.03] transition-colors relative group ${notif.read ? "opacity-75" : ""}`}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8DEE5F]" />
                    )}

                    <div className="flex gap-4 items-start pl-2">
                      <div
                        className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr border ${getGradient(notif.type)}`}
                      >
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p
                          className={`text-sm leading-tight ${notif.read ? "text-zinc-400" : "text-white font-medium"}`}
                        >
                          {notif.message}
                        </p>
                        <p className="text-xs font-medium text-zinc-500">
                          {notif.time}
                        </p>
                      </div>
                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 bg-white/[0.01]">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-2"
            >
              Notification Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

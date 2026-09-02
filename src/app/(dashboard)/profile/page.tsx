"use client";

import { useState } from "react";
import {
  User,
  Settings,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const nameParts = (user?.name || "John Doe").split(" ");
  const firstName = nameParts[0] || "John";
  const lastName = nameParts.slice(1).join(" ") || "Doe";

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
          <User className="w-5 h-5 text-[#00C6D8]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Your Profile
          </h1>
          <p className="text-sm text-zinc-400">
            Manage your personal information, credentials, and ecosystem
            preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Personal Details</h3>
              {user?.role && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00C6D8]/10 text-[#00C6D8] border border-[#00C6D8]/20">
                  Role: {user.role}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={firstName}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={lastName}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || "john.doe@example.com"}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue="Building and scaling on the Thrivo platform."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" /> Saved!
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <Settings className="w-5 h-5 text-zinc-400" />
                <span className="text-sm font-medium text-white">
                  Account Settings
                </span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <Shield className="w-5 h-5 text-zinc-400" />
                <span className="text-sm font-medium text-white">
                  Security & Privacy
                </span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <Bell className="w-5 h-5 text-zinc-400" />
                <span className="text-sm font-medium text-white">
                  Notifications
                </span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <CreditCard className="w-5 h-5 text-zinc-400" />
                <span className="text-sm font-medium text-white">
                  Billing & Thrivo Pro
                </span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

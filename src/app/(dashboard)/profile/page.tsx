import { User, Settings, Shield, Bell, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Your Profile
          </h1>
          <p className="text-sm text-zinc-400">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Personal Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
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
                  defaultValue="john.doe@example.com"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue="Building the next generation of SaaS tools."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C6D8] transition-colors resize-none"
                ></textarea>
              </div>
              <button className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-colors">
                Save Changes
              </button>
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
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors">
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

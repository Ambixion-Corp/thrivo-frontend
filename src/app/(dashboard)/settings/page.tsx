import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  CreditCard,
  Lock,
  Eye,
  MonitorSmartphone,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
          <SettingsIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-zinc-400">
            Manage your account configurations and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-3 space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-zinc-900 text-white font-medium">
            <SettingsIcon className="w-5 h-5 text-[#00C6D8]" /> Account
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900/50 text-zinc-400 font-medium transition-colors">
            <Shield className="w-5 h-5" /> Security
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900/50 text-zinc-400 font-medium transition-colors">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900/50 text-zinc-400 font-medium transition-colors">
            <CreditCard className="w-5 h-5" /> Billing
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900/50 text-zinc-400 font-medium transition-colors">
            <MonitorSmartphone className="w-5 h-5" /> Devices
          </button>
        </div>

        {/* Content */}
        <div className="md:col-span-9 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">
              Security Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Password</h4>
                    <p className="text-sm text-zinc-500">
                      Last changed 3 months ago
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold rounded-xl transition-colors">
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-zinc-500">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#00C6D8] text-black text-sm font-bold rounded-xl hover:bg-[#00C6D8]/80 transition-colors">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Profile Visibility</h4>
                    <p className="text-sm text-zinc-500">
                      Control who sees your profile
                    </p>
                  </div>
                </div>
                <select className="bg-zinc-800 text-white text-sm font-bold px-4 py-2 rounded-xl border border-zinc-700 focus:outline-none">
                  <option>Public</option>
                  <option>Investors Only</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

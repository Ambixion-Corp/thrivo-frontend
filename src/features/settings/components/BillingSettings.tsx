import {
  Check,
  Crown,
  Zap,
  BarChart2,
  Shield,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export function BillingSettings() {
  return (
    <div className="space-y-12">
      {/* Current Plan Alert */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Current Plan: <span className="text-zinc-400">Thrivo Basic</span>
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            You are currently on the free tier. Upgrade to unlock powerful
            network tools.
          </p>
        </div>
        <div className="px-4 py-2 bg-white/10 text-white text-sm font-bold rounded-lg">
          Free
        </div>
      </div>

      {/* Pricing Comparison */}
      <div>
        <h3 className="text-2xl font-extrabold text-white mb-6">
          Available Plans
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thrivo Basic */}
          <div className="bg-black/40 border border-white/10 rounded-[2rem] p-8 flex flex-col">
            <h4 className="text-xl font-bold text-white mb-2">Thrivo Basic</h4>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-zinc-500 font-medium mb-1">/ forever</span>
            </div>

            <p className="text-sm text-zinc-400 mb-8 border-b border-white/10 pb-6">
              Everything you need to set up your profile and browse the
              ecosystem.
            </p>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                Standard Founder & Startup Profiles
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                Basic Discovery Feed Access
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                Standard Messaging (5 new contacts/mo)
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-white/50 shrink-0" />
                Data Room Requests (3 requests/mo)
              </li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-white/5 text-zinc-500 font-bold border border-white/10 cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Thrivo Pro */}
          <div className="bg-[#0A0A0A] border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.1)] rounded-[2rem] p-8 flex flex-col relative overflow-hidden group hover:border-yellow-500/50 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)] transition-all duration-500">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-yellow-500/20 transition-colors duration-500" />

            <div className="flex justify-between items-start mb-2 relative z-10">
              <h4 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
                <Crown className="w-5 h-5" /> Thrivo Pro
              </h4>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-yellow-500/30">
                Recommended
              </span>
            </div>

            <div className="flex items-end gap-1 mb-6 relative z-10">
              <span className="text-4xl font-extrabold text-white">$49</span>
              <span className="text-zinc-500 font-medium mb-1">/ month</span>
            </div>

            <p className="text-sm text-zinc-300 mb-8 border-b border-white/10 pb-6 relative z-10">
              The ultimate advantage for serious founders and active investors.
            </p>

            <ul className="space-y-4 mb-8 flex-1 relative z-10">
              <li className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <div className="p-1 rounded-md bg-yellow-500/20 text-yellow-500 shrink-0">
                  <BarChart2 className="w-4 h-4" />
                </div>
                Advanced Analytics (See exactly who views your deck)
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <div className="p-1 rounded-md bg-yellow-500/20 text-yellow-500 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                Priority Inbox Routing & Unlimited Messages
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <div className="p-1 rounded-md bg-yellow-500/20 text-yellow-500 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                Unlimited Data Room Access & Invites
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <div className="p-1 rounded-md bg-yellow-500/20 text-yellow-500 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                Custom &quot;Pro&quot; Profile Styling & Badges
              </li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:-translate-y-1 active:scale-95 transition-all relative z-10 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 fill-black" /> Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

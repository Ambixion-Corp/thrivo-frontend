import {
  Bell,
  Heart,
  MessageSquare,
  FolderLock,
  DollarSign,
} from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "data_room",
      text: "Sequoia Capital requested access to your data room.",
      time: "2h ago",
      icon: FolderLock,
      color: "text-[#00C6D8]",
      bg: "bg-[#00C6D8]/20",
    },
    {
      id: 2,
      type: "message",
      text: "Mia Chang sent you a message.",
      time: "4h ago",
      icon: MessageSquare,
      color: "text-[#8DEE5F]",
      bg: "bg-[#8DEE5F]/20",
    },
    {
      id: 3,
      type: "like",
      text: "Alex Rivera liked your recent pitch update.",
      time: "1d ago",
      icon: Heart,
      color: "text-red-500",
      bg: "bg-red-500/20",
    },
    {
      id: 4,
      type: "payment",
      text: "Your escrow payment of $5,000 has been released.",
      time: "2d ago",
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/20",
    },
  ];

  return (
    <div className="py-8 w-full px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Notifications
            </h1>
            <p className="text-sm text-zinc-400">
              Stay updated on your ecosystem activity
            </p>
          </div>
        </div>
        <button className="text-sm font-bold text-[#00C6D8] hover:text-[#00C6D8]/80 transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden divide-y divide-zinc-800/50">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-5 flex items-start gap-4 hover:bg-zinc-800/50 transition-colors cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${notif.bg}`}
            >
              <notif.icon className={`w-5 h-5 ${notif.color}`} />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm font-medium text-white group-hover:text-[#00C6D8] transition-colors">
                {notif.text}
              </p>
              <p className="text-xs text-zinc-500 font-bold mt-1">
                {notif.time}
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#00C6D8] mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

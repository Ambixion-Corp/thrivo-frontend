import { Inbox } from "@/features/messaging/components/Inbox";

export default function MessagesPage() {
  return (
    <div className="w-full px-4 sm:px-6 h-[calc(100vh-2rem)] flex flex-col">
      <Inbox />
    </div>
  );
}

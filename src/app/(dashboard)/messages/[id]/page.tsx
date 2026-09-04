import { Inbox } from "@/features/messaging/components/Inbox";

interface DynamicMessagesPageProps {
  params: Promise<{ id: string }>;
}

export default async function DynamicMessagesPage({
  params,
}: DynamicMessagesPageProps) {
  const { id } = await params;

  return (
    <div className="w-full px-4 sm:px-6 h-[calc(100vh-2rem)] flex flex-col">
      <Inbox initialConversationId={id} />
    </div>
  );
}

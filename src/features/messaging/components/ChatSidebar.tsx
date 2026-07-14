import { Conversation } from "../types";
import { formatDistanceToNow } from "date-fns";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  selectedId,
  onSelect,
}: ChatSidebarProps) {
  return (
    <div className="w-full md:w-80 border-r border-border bg-card/30 backdrop-blur-xl h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h2 className="text-lg font-bold text-foreground">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const isSelected = conv.id === selectedId;
          const lastMessage = conv.messages[conv.messages.length - 1];

          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full text-left p-4 flex items-start gap-3 transition-colors border-b border-border/10 ${
                isSelected ? "bg-[#00C6D8]/10" : "hover:bg-muted/50"
              }`}
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px] shrink-0">
                <div className="h-full w-full rounded-full bg-background flex items-center justify-center font-bold text-sm">
                  {conv.participant.avatarInitials}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex flex-col truncate">
                    <h3 className="font-semibold text-foreground truncate">
                      {conv.participant.name}
                    </h3>
                    <span className="text-[10px] text-[#00C6D8] font-bold">
                      {conv.participant.username}
                    </span>
                  </div>
                  {lastMessage && (
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                      {formatDistanceToNow(new Date(lastMessage.timestamp), {
                        addSuffix: false,
                      }).replace("about ", "")}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center gap-2">
                  <p
                    className={`text-xs truncate ${conv.unreadCount > 0 && !isSelected ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {lastMessage?.senderId === "me" ? "You: " : ""}
                    {lastMessage?.text || "No messages yet."}
                  </p>

                  {conv.unreadCount > 0 && !isSelected && (
                    <div className="h-5 w-5 rounded-full bg-[#00C6D8] flex items-center justify-center text-[10px] font-bold text-black shrink-0">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

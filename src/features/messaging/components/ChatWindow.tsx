import { Conversation } from "../types";
import { Send, ArrowLeft, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (text: string) => void;
  onBack?: () => void; // For mobile
}

export function ChatWindow({
  conversation,
  onSendMessage,
  onBack,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll on load and when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const isInvestor = conversation.participant.role === "investor";
  const profileLink = isInvestor
    ? `/investors` // Or specific ID if we had investor profiles
    : `/founders/${conversation.participant.id}`;

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden mr-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-[1.5px]">
            <div className="h-full w-full rounded-full bg-background flex items-center justify-center font-bold text-xs">
              {conversation.participant.avatarInitials}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-foreground leading-tight">
              {conversation.participant.name}
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              {conversation.participant.role}
            </p>
          </div>
        </div>

        <Link
          href={profileLink}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-[#00C6D8] transition-colors bg-secondary/50 px-3 py-1.5 rounded-full"
        >
          View Profile <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 relative z-10">
        {conversation.messages.map((msg, index) => {
          const isMe = msg.senderId === "me";
          // Basic check to see if we should show timestamp (if time diff > 5 mins)
          const prevMsg = index > 0 ? conversation.messages[index - 1] : null;
          const showTime =
            !prevMsg ||
            new Date(msg.timestamp).getTime() -
              new Date(prevMsg.timestamp).getTime() >
              5 * 60 * 1000;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              {showTime && (
                <span className="text-[10px] text-muted-foreground font-medium mb-3">
                  {format(new Date(msg.timestamp), "MMM d, h:mm a")}
                </span>
              )}

              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                  isMe
                    ? "bg-gradient-to-br from-[#00C6D8] to-[#0098A6] text-black rounded-tr-sm shadow-md"
                    : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-background border-t border-border/50 shrink-0 relative z-10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-card border border-border rounded-full pl-6 pr-14 py-3.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#00C6D8] transition-shadow placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-background hover:bg-[#00C6D8] hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-foreground disabled:hover:text-background"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </form>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C6D8]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </div>
  );
}

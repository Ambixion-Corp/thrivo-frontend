"use client";

import { useQuery } from "@tanstack/react-query";
import { getConversations } from "@/features/messaging/api/getConversations";
import { ChatSidebar } from "@/features/messaging/components/ChatSidebar";
import { ChatWindow } from "@/features/messaging/components/ChatWindow";
import { useState, useMemo } from "react";
import { Message } from "@/features/messaging/types";

export default function MessagesPage() {
  const { data: initialConversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  // Local state for new messages (grouped by conversation ID)
  const [newMessages, setNewMessages] = useState<Record<string, Message[]>>({});
  const [clearedUnread, setClearedUnread] = useState<Record<string, boolean>>(
    {},
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showChatMobile, setShowChatMobile] = useState(false);

  // Derive the final conversations array
  const conversations = useMemo(() => {
    if (!initialConversations) return [];

    const convs = initialConversations.map((conv) => {
      const addedMessages = newMessages[conv.id] || [];
      return {
        ...conv,
        messages: [...conv.messages, ...addedMessages],
        unreadCount: clearedUnread[conv.id] ? 0 : conv.unreadCount,
      };
    });

    // Sort so conversations with newest messages are at top
    convs.sort((a, b) => {
      const aLast = a.messages[a.messages.length - 1];
      const bLast = b.messages[b.messages.length - 1];
      if (!aLast || !bLast) return 0;
      return (
        new Date(bLast.timestamp).getTime() -
        new Date(aLast.timestamp).getTime()
      );
    });

    return convs;
  }, [initialConversations, newMessages, clearedUnread]);

  const activeId =
    selectedId || (conversations.length > 0 ? conversations[0].id : null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowChatMobile(true);
    setClearedUnread((prev) => ({ ...prev, [id]: true }));
  };

  const handleSendMessage = (text: string) => {
    if (!activeId) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toISOString(),
    };

    setNewMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage],
    }));

    // Simulate a reply after 1.5 seconds if talking to Sarah
    const activeConv = conversations.find((c) => c.id === activeId);
    if (activeConv?.participant.name === "Sarah Jenkins") {
      setTimeout(() => {
        const replyMsg: Message = {
          id: `msg_${Date.now() + 1}`,
          senderId: activeConv.participant.id,
          text: "That sounds great! I'll send over a calendar invite.",
          timestamp: new Date().toISOString(),
        };

        setNewMessages((current) => ({
          ...current,
          [activeId]: [...(current[activeId] || []), replyMsg],
        }));
      }, 1500);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full bg-background border border-border rounded-none sm:rounded-2xl overflow-hidden mt-0 sm:mt-6 animate-pulse">
        <div className="w-full md:w-80 border-r border-border bg-card/30 h-full p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-12 w-12 rounded-full bg-muted shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 w-1/2 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center bg-card/10">
          <div className="h-8 w-8 rounded-full border-4 border-muted border-t-[#00C6D8] animate-spin" />
        </div>
      </div>
    );
  }

  const selectedConv = conversations.find((c) => c.id === activeId);

  return (
    <div className="flex h-full w-full sm:h-[calc(100vh-6rem)] bg-background border-y sm:border border-border rounded-none sm:rounded-2xl overflow-hidden shadow-2xl relative z-10">
      {/* Sidebar - hidden on mobile if viewing chat */}
      <div
        className={`h-full w-full md:w-80 shrink-0 ${showChatMobile ? "hidden md:block" : "block"}`}
      >
        <ChatSidebar
          conversations={conversations}
          selectedId={activeId}
          onSelect={handleSelect}
        />
      </div>

      {/* Main Chat Area - hidden on mobile if viewing sidebar */}
      <div
        className={`h-full flex-1 ${!showChatMobile ? "hidden md:flex" : "flex"}`}
      >
        {selectedConv ? (
          <ChatWindow
            conversation={selectedConv}
            onSendMessage={handleSendMessage}
            onBack={() => setShowChatMobile(false)}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground bg-card/10">
            <div className="h-16 w-16 mb-4 rounded-full bg-muted flex items-center justify-center">
              💬
            </div>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

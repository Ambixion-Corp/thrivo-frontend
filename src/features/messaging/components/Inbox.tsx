"use client";

import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Inbox() {
  const { user } = useAuthStore();
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    sendMessage,
  } = useChatStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId || !user) return;

    sendMessage(activeConversationId, inputText, user.id);
    setInputText("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  return (
    <div className="flex h-[calc(100vh-80px)] lg:h-[calc(100vh-64px)] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-zinc-800 bg-black shadow-2xl mt-4">
      {/* Sidebar - Conversation List */}
      <div
        className={`w-full lg:w-80 border-r border-zinc-800 flex flex-col ${activeConversationId ? "hidden lg:flex" : "flex"}`}
      >
        <div className="p-4 border-b border-zinc-800 font-bold text-xl text-white">
          Messages
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={`w-full flex items-center gap-4 p-4 hover:bg-zinc-900 transition-colors text-left border-b border-zinc-800/50 ${activeConversationId === conv.id ? "bg-zinc-900" : ""}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                  <Image
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                {conv.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#00C6D8] text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white truncate">
                  {conv.participantName}
                </div>
                <div className="text-sm text-zinc-500 truncate">
                  {conv.messages[conv.messages.length - 1]?.text ||
                    "No messages"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col bg-zinc-950 ${!activeConversationId ? "hidden lg:flex" : "flex"}`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-black">
              <div className="flex items-center gap-4">
                {/* Mobile back button */}
                <button
                  className="lg:hidden text-zinc-400 hover:text-white"
                  onClick={() => setActiveConversation(null)}
                >
                  ←
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800">
                  <Image
                    src={activeConversation.participantAvatar}
                    alt={activeConversation.participantName}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="font-bold text-white">
                  {activeConversation.participantName}
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <button className="hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence initial={false}>
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                          isMe
                            ? "bg-[#00C6D8] text-black rounded-br-sm"
                            : "bg-zinc-800 text-white rounded-bl-sm"
                        }`}
                      >
                        <div className="text-sm font-medium">{msg.text}</div>
                        <div
                          className={`text-[10px] mt-1 text-right ${isMe ? "text-black/60" : "text-zinc-400"}`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black border-t border-zinc-800">
              <form
                onSubmit={handleSend}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Message..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#00C6D8]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#00C6D8] text-black disabled:opacity-50 disabled:bg-zinc-700"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500 flex-col gap-4">
            <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <Send className="w-8 h-8" />
            </div>
            <p className="font-medium">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

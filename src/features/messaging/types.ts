export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  role: "founder" | "investor";
  avatarInitials: string;
}

export interface Conversation {
  id: string;
  participant: ConversationParticipant;
  messages: Message[];
  unreadCount: number;
}

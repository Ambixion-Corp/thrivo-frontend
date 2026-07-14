export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  systemActionUrl?: string;
  systemActionText?: string;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  username: string;
  role: "founder" | "investor";
  avatarInitials: string;
}

export interface Conversation {
  id: string;
  participant: ConversationParticipant;
  messages: Message[];
  unreadCount: number;
}

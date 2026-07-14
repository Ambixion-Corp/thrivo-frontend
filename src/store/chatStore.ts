import { create } from "zustand";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  messages: Message[];
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string, senderId: string) => void;
}

const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    participantId: "1",
    participantName: "Dev Tribhuwan",
    participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    unreadCount: 2,
    messages: [
      {
        id: "msg_1",
        senderId: "1",
        text: "Hey! Loved your recent pitch deck.",
        timestamp: "10:30 AM",
      },
      {
        id: "msg_2",
        senderId: "1",
        text: "Are you free to chat about the seed round?",
        timestamp: "10:31 AM",
      },
    ],
  },
  {
    id: "conv_2",
    participantId: "2",
    participantName: "Alex Rivera",
    participantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    unreadCount: 0,
    messages: [
      {
        id: "msg_3",
        senderId: "mock_user_1",
        text: "When is the new hardware dropping?",
        timestamp: "Yesterday",
      },
      {
        id: "msg_4",
        senderId: "2",
        text: "Next week! Will send you an early link.",
        timestamp: "Yesterday",
      },
    ],
  },
];

export const useChatStore = create<ChatState>((set) => ({
  conversations: mockConversations,
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  sendMessage: (conversationId, text, senderId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Date.now().toString(),
                  senderId,
                  text,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : conv,
      ),
    })),
}));

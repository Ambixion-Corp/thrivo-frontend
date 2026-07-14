import { Conversation } from "../types";

// Current logged in user is "me"
const CURRENT_USER_ID = "me";

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    participant: {
      id: "inv_1",
      name: "Sarah Jenkins",
      username: "@sarah",
      role: "investor",
      avatarInitials: "SJ",
    },
    unreadCount: 2,
    messages: [
      {
        id: "msg_1",
        senderId: "system",
        text: "Data Room Access Approved",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        isSystem: true,
        systemActionUrl: "/startups/my-startup/dataroom",
        systemActionText: "Enter Data Room",
      },
      {
        id: "msg_1_a",
        senderId: "inv_1",
        text: "Hi there! I saw your pitch on the discovery feed. Really impressive traction.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: "msg_2",
        senderId: "inv_1",
        text: "Would love to chat more about your Series A plans. Do you have time next week?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      },
    ],
  },
  {
    id: "conv_2",
    participant: {
      id: "2",
      name: "Juztriyaa",
      username: "@juztriyaa",
      role: "founder",
      avatarInitials: "J",
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg_3",
        senderId: CURRENT_USER_ID,
        text: "Hey! Loved your recent product launch. How's the reception been?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
      {
        id: "msg_4",
        senderId: "2",
        text: "Thanks! It's been overwhelming. We hit 10k MRR this morning.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
      },
      {
        id: "msg_5",
        senderId: CURRENT_USER_ID,
        text: "Incredible. Let's catch up soon.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString(),
      },
    ],
  },
  {
    id: "conv_3",
    participant: {
      id: "inv_4",
      name: "David Chen",
      username: "@david",
      role: "investor",
      avatarInitials: "DC",
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg_6",
        senderId: "inv_4",
        text: "I reviewed the deck in your portfolio. Solid deep tech play.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      },
    ],
  },
];

export async function getConversations(): Promise<Conversation[]> {
  const delay = Math.floor(Math.random() * 500) + 200;
  await new Promise((r) => setTimeout(r, delay));

  return MOCK_CONVERSATIONS;
}

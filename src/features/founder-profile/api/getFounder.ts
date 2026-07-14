// import removed

export interface FounderData {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  followersCount: number;
  followingCount: number;
  avatar: string;
  startups: StartupData[];
}

export interface StartupData {
  id: string;
  name: string;
  username: string;
  oneLiner: string;
  description: string;
  tags: string[];
  metrics: {
    raised: string;
    users: string;
  };
  imageUrl: string;
  deckUrl?: string; // NDA locked if not investor
}

const MOCK_FOUNDERS: Record<string, FounderData> = {
  "1": {
    id: "1",
    name: "Dev Tribhuwan",
    username: "@dev_trib",
    bio: "Building the OS for entrepreneurship. Ex-YC. Focused on unified platforms.",
    location: "San Francisco, CA",
    followersCount: 14200,
    followingCount: 340,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    startups: [
      {
        id: "startup_1",
        name: "Thrivo",
        username: "@thrivo_os",
        oneLiner: "The Operating System for Entrepreneurship.",
        description:
          "A unified network connecting founders, creators, and investors to solve startup fragmentation.",
        tags: ["Marketplace", "SaaS", "FinTech"],
        metrics: {
          raised: "$2.5M",
          users: "12k+",
        },
        imageUrl: "/startup_feed_1.png",
        deckUrl: "/mock_deck_1.pdf",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Alex Rivera",
    username: "@alex_r",
    bio: "Serial hardware builder. Making things that go fast.",
    location: "Austin, TX",
    followersCount: 8500,
    followingCount: 120,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    startups: [
      {
        id: "startup_2",
        name: "AeroDynamics",
        username: "@aero_d",
        oneLiner: "Next-gen aerodynamic sensors for EV sports cars.",
        description:
          "We build high-precision wind sensors that bolt directly onto consumer EVs to optimize battery range.",
        tags: ["Hardware", "EV", "DeepTech"],
        metrics: {
          raised: "$1.2M",
          users: "500+",
        },
        imageUrl: "/startup_feed_2.png",
        deckUrl: "/mock_deck_2.pdf",
      },
    ],
  },
};

export const getFounderProfile = async (id: string): Promise<FounderData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const founder = MOCK_FOUNDERS[id];
  if (!founder) {
    throw new Error("Founder not found");
  }
  return founder;
};

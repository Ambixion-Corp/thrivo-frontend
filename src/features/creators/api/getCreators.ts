// import removed

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  platforms: ("youtube" | "tiktok" | "instagram" | "twitter")[];
  niche: string[];
  startingRate: string;
}

const mockCreators: Creator[] = [
  {
    id: "creator_1",
    name: "Mia Chang",
    username: "@mia_builds",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    bio: "Tech reviews & SaaS deep dives. Helping founders reach their first 10k users.",
    followers: 125000,
    platforms: ["youtube", "twitter"],
    niche: ["SaaS", "Productivity"],
    startingRate: "$500 / video",
  },
  {
    id: "creator_2",
    name: "Leon Scott",
    username: "@leon_hw",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leon",
    bio: "Hardware unboxings. Fast-paced 60fps tech aesthetics.",
    followers: 890000,
    platforms: ["tiktok", "instagram"],
    niche: ["Hardware", "EV", "Gadgets"],
    startingRate: "$1.2k / short",
  },
];

export const getCreators = async (): Promise<Creator[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCreators;
};

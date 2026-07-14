import { CreatorProfile } from "../types";

// Mock data for creators
const MOCK_CREATORS: Record<string, CreatorProfile> = {
  "crt-1": {
    id: "crt-1",
    userId: "usr-3",
    displayName: "Marques Brownlee",
    handle: "@mkbhd",
    bio: "Quality Tech Videos | YouTuber | Geek | Consumer Electronics | Tech Head | Internet Personality!",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
    niche: ["Technology", "Gadgets", "Consumer Electronics", "Startups"],
    audience: [
      {
        platform: "youtube",
        followers: 18000000,
        engagementRate: 8.5,
        topDemographic: "18-24 Male",
      },
      {
        platform: "twitter",
        followers: 6000000,
        engagementRate: 4.2,
        topDemographic: "18-34 Tech Enthusiasts",
      },
    ],
    pastCampaigns: [
      {
        id: "camp-1",
        productName: "Nothing Phone (2)",
        companyName: "Nothing",
        conversionRate: 2.4,
        earnings: 125000,
      },
      {
        id: "camp-2",
        productName: "Dbrand Skins",
        companyName: "Dbrand",
        conversionRate: 5.1,
        earnings: 250000,
      },
    ],
  },
  "crt-2": {
    id: "crt-2",
    userId: "usr-4",
    displayName: "Justine Ezarik",
    handle: "@ijustine",
    bio: "Tech, Video Games, and Apple enthusiast.",
    niche: ["Technology", "Gaming", "Apple"],
    audience: [
      {
        platform: "youtube",
        followers: 7000000,
        engagementRate: 5.5,
        topDemographic: "18-34 Mixed",
      },
    ],
    pastCampaigns: [],
  },
};

export async function getCreator(id: string): Promise<CreatorProfile> {
  // Simulate network delay

  const creator = MOCK_CREATORS[id];
  if (!creator) {
    throw new Error(`Creator with id ${id} not found`);
  }

  return creator;
}

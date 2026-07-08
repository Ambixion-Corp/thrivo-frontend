import { CreatorProfile } from "../types";

const mockCreators: CreatorProfile[] = [
  {
    id: "creator_1",
    name: "Alex Dev",
    handle: "@alexbuilds",
    bio: "Ex-FAANG engineer turned full-time creator. I review developer tools, SaaS products, and build in public on YouTube.",
    primaryPlatform: "YouTube",
    audienceSize: "1.2M",
    engagementRate: "8.4%",
    topSectors: ["SaaS", "DevTools", "AI"],
    pastSponsors: ["Vercel", "Supabase", "Stripe"],
  },
  {
    id: "creator_2",
    name: "Sarah Ventures",
    handle: "@sarahventures",
    bio: "Angel investor & creator. Breaking down startup pitches and growth tactics for the next generation of founders.",
    primaryPlatform: "X (Twitter)",
    audienceSize: "350k",
    engagementRate: "12.1%",
    topSectors: ["Fintech", "B2B", "SaaS"],
    pastSponsors: ["Mercury", "Brex", "Deel"],
  },
  {
    id: "creator_3",
    name: "Tech Digest",
    handle: "@techdigest",
    bio: "Weekly newsletter curating the best new hardware and productivity software.",
    primaryPlatform: "Newsletter",
    audienceSize: "85k",
    engagementRate: "42.5%",
    topSectors: ["Hardware", "Productivity", "Consumer"],
    pastSponsors: ["Notion", "Linear", "Logitech"],
  },
  {
    id: "creator_4",
    name: "Marcus Tech",
    handle: "@marcustech",
    bio: "Unboxing the future. Short-form tech reviews focusing on Gen-Z consumer products.",
    primaryPlatform: "TikTok",
    audienceSize: "2.8M",
    engagementRate: "15.3%",
    topSectors: ["Hardware", "Gaming", "Consumer"],
    pastSponsors: ["Razer", "Sony", "Discord"],
  },
];

export async function getCreators(filters?: {
  platform?: string;
  minAudience?: number;
}): Promise<CreatorProfile[]> {
  const delay = Math.floor(Math.random() * 600) + 200;
  await new Promise((resolve) => setTimeout(resolve, delay));

  let results = [...mockCreators];

  if (filters?.platform && filters.platform !== "All Platforms") {
    results = results.filter((c) => c.primaryPlatform === filters.platform);
  }

  // Simple minAudience logic for demo purposes
  if (filters?.minAudience) {
    results = results.filter((c) => {
      if (c.audienceSize.includes("M"))
        return parseFloat(c.audienceSize) * 1000000 >= filters.minAudience!;
      if (c.audienceSize.includes("k"))
        return parseFloat(c.audienceSize) * 1000 >= filters.minAudience!;
      return parseFloat(c.audienceSize) >= filters.minAudience!;
    });
  }

  return results;
}

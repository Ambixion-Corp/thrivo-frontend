export type Platform =
  "YouTube" | "TikTok" | "Instagram" | "X (Twitter)" | "Newsletter";

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  bio: string;
  primaryPlatform: Platform;
  audienceSize: string;
  engagementRate: string;
  topSectors: string[];
  pastSponsors: string[];
}

export interface AffiliateCampaign {
  id: string;
  startupName: string;
  bounty: string;
  commission: string;
  clicks: number;
  conversions: number;
  earnings: string;
  status: "Active" | "Pending" | "Completed";
}

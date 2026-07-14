export interface AudienceMetrics {
  platform: "youtube" | "twitter" | "tiktok" | "instagram";
  followers: number;
  engagementRate: number; // percentage
  topDemographic: string;
}

export interface AffiliateLink {
  id: string;
  productName: string;
  companyName: string;
  conversionRate: number; // percentage
  earnings: number;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  displayName: string;
  handle: string;
  bio: string;
  avatarUrl?: string;
  niche: string[];
  audience: AudienceMetrics[];
  pastCampaigns: AffiliateLink[];
}

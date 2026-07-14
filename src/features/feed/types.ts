export type UserRole = "founder" | "investor" | "creator" | "consumer";

export interface FeedItem {
  id: string;
  startupName: string;
  startupUsername: string;
  founderName: string;
  founderUsername: string;
  founderId: string;
  oneLiner: string;
  description: string;
  mediaUrl?: string;
  imageUrl?: string;
  metrics: {
    raised?: string;
    arr?: string;
    users?: string;
  };
  tags: string[];

  // Role specific fields
  bountyAmount?: string; // For Creators
  affiliateCommission?: string; // For Creators
  price?: string; // For Consumers
  ticketSize?: string; // For Investors
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor?: number;
}

export interface FeedItem {
  id: string;
  startupName: string;
  founderName: string;
  founderId: string;
  oneLiner: string;
  description: string;
  mediaUrl?: string;
  metrics: {
    raised?: string;
    arr?: string;
    users?: string;
  };
  tags: string[];
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor?: number;
}

import { FeedResponse } from "../types";

// Mock data generator for infinite scroll
const generateMockFeedItems = (page: number, limit: number) => {
  return Array.from({ length: limit }).map((_, i) => {
    const globalIndex = page * limit + i;
    return {
      id: `feed_${globalIndex}`,
      startupName: `Venture ${globalIndex + 1}`,
      founderName: `Founder ${globalIndex % 5 + 1}`,
      founderId: `${globalIndex % 2 + 1}`, // Linking back to our mocked founders 1 or 2
      oneLiner: `Revolutionizing the way we think about industry ${globalIndex % 10}.`,
      description: "We are building the next generation of tools for the creators of tomorrow. Our platform uses advanced AI to synthesize workflows and optimize output, saving teams hundreds of hours per week.",
      metrics: {
        raised: `$${(Math.random() * 5 + 0.5).toFixed(1)}M`,
        users: `${Math.floor(Math.random() * 50 + 1)}k+`,
      },
      tags: ["AI", "SaaS", "B2B"],
    };
  });
};

export async function getFeed(pageParam = 0): Promise<FeedResponse> {
  const limit = 5;
  const delay = Math.floor(Math.random() * 800) + 400; // Simulated latency
  
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  const items = generateMockFeedItems(pageParam, limit);
  
  return {
    items,
    // Simulate end of feed after 5 pages
    nextCursor: pageParam < 4 ? pageParam + 1 : undefined,
  };
}

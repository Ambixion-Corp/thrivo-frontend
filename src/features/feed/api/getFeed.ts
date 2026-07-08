import { FeedResponse } from "../types";

import { UserRole } from "../types";

// Mock data generator for infinite scroll
const generateMockFeedItems = (page: number, limit: number, role: UserRole) => {
  return Array.from({ length: limit }).map((_, i) => {
    const globalIndex = page * limit + i;

    let bountyAmount, affiliateCommission, price, ticketSize;
    let description =
      "We are building the next generation of tools for the creators of tomorrow. Our platform uses advanced AI to synthesize workflows and optimize output, saving teams hundreds of hours per week.";

    if (role === "creator") {
      bountyAmount = `$${(Math.random() * 500 + 100).toFixed(0)}`;
      affiliateCommission = `${(Math.random() * 15 + 5).toFixed(0)}%`;
      description = `Looking for top-tier creators to promote our new launch. We offer a ${affiliateCommission} commission and a ${bountyAmount} flat bounty per verified signup.`;
    } else if (role === "consumer") {
      price = `$${(Math.random() * 99 + 9).toFixed(0)}`;
      description = `Early access to our flagship hardware product. Get it now for just ${price}.`;
    } else if (role === "investor") {
      ticketSize = `$${(Math.random() * 500 + 100).toFixed(0)}k minimum check`;
      description = `Raising our Seed round to accelerate GTM. Already hit $10k MRR organically. Looking for strategic angels.`;
    }

    return {
      id: `feed_${globalIndex}`,
      startupName: `Venture ${globalIndex + 1}`,
      founderName: `Founder ${(globalIndex % 5) + 1}`,
      founderId: `${(globalIndex % 2) + 1}`, // Linking back to our mocked founders 1 or 2
      oneLiner: `Revolutionizing the way we think about industry ${globalIndex % 10}.`,
      description,
      metrics: {
        raised: `$${(Math.random() * 5 + 0.5).toFixed(1)}M`,
        users: `${Math.floor(Math.random() * 50 + 1)}k+`,
      },
      tags: ["AI", "SaaS", "B2B"],
      bountyAmount,
      affiliateCommission,
      price,
      ticketSize,
    };
  });
};

export async function getFeed(
  pageParam = 0,
  role: UserRole = "founder",
): Promise<FeedResponse> {
  const limit = 5;
  const delay = Math.floor(Math.random() * 800) + 400; // Simulated latency

  await new Promise((resolve) => setTimeout(resolve, delay));

  const items = generateMockFeedItems(pageParam, limit, role);

  return {
    items,
    // Simulate end of feed after 5 pages
    nextCursor: pageParam < 4 ? pageParam + 1 : undefined,
  };
}

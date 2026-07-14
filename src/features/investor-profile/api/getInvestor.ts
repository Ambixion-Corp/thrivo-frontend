import { InvestorProfile } from "../types";

// Mock data for investors
const MOCK_INVESTORS: Record<string, InvestorProfile> = {
  "inv-1": {
    id: "inv-1",
    userId: "usr-1",
    fundName: "Sequoia Capital",
    tagline: "We help the daring build legendary companies.",
    logoUrl:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    websiteUrl: "https://sequoiacap.com",
    location: "Menlo Park, CA",
    aum: 85000,
    thesis: {
      focusSectors: ["Enterprise Software", "Fintech", "AI/ML", "Healthcare"],
      checkSize: {
        min: 1000000,
        max: 50000000,
      },
      preferredStages: ["Seed", "Series A", "Series B", "Growth"],
      description:
        "We partner early and partner for life. We are looking for founders who are deeply obsessed with solving hard problems and have the resilience to build category-defining companies.",
    },
    portfolio: [
      {
        id: "port-1",
        name: "Stripe",
        industry: "Fintech",
        stage: "Post-IPO",
        description: "Financial infrastructure for the internet.",
      },
      {
        id: "port-2",
        name: "Airbnb",
        industry: "Travel",
        stage: "Post-IPO",
        description: "Vacation rentals, cabins, beach houses, unique homes.",
      },
    ],
  },
  "inv-2": {
    id: "inv-2",
    userId: "usr-2",
    fundName: "Nexus Venture Partners",
    tagline: "Partnering with extraordinary entrepreneurs globally.",
    location: "Mumbai, India",
    aum: 2000,
    thesis: {
      focusSectors: ["SaaS", "Deep Tech", "Consumer Internet"],
      checkSize: {
        min: 500000,
        max: 10000000,
      },
      preferredStages: ["Seed", "Series A"],
      description:
        "We are an early-stage venture capital firm partnering with founders building product-first companies.",
    },
    portfolio: [
      {
        id: "port-3",
        name: "Postman",
        industry: "Developer Tools",
        stage: "Series D",
        description: "API platform for building and using APIs.",
      },
    ],
  },
};

export async function getInvestor(id: string): Promise<InvestorProfile> {
  // Simulate network delay

  const investor = MOCK_INVESTORS[id];
  if (!investor) {
    throw new Error(`Investor with id ${id} not found`);
  }

  return investor;
}

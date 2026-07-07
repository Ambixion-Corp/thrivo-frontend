import { Investor } from "../types";

const MOCK_INVESTORS: Investor[] = [
  {
    id: "inv_1",
    name: "Sarah Jenkins",
    firmName: "Apex Ventures",
    location: "San Francisco, CA",
    stages: ["Pre-seed", "Seed"],
    sectors: ["AI", "SaaS"],
    checkSize: "$250K - $1M",
    thesis: "Backing technical founders building the next generation of generative AI tools for enterprise workflows.",
  },
  {
    id: "inv_2",
    name: "Marcus Thorne",
    firmName: "Horizon Capital",
    location: "New York, NY",
    stages: ["Seed", "Series A"],
    sectors: ["Fintech", "SaaS"],
    checkSize: "$1M - $5M",
    thesis: "We invest in infrastructure that makes financial services more accessible, transparent, and programmatic.",
  },
  {
    id: "inv_3",
    name: "Elena Rodriguez",
    firmName: "Blue Ocean Syndicate",
    location: "London, UK",
    stages: ["Pre-seed"],
    sectors: ["Consumer", "DeepTech"],
    checkSize: "$50K - $250K",
    thesis: "High-conviction angel syndicate focusing on contrarian consumer social apps and early-stage deep tech.",
  },
  {
    id: "inv_4",
    name: "David Chen",
    firmName: "Nexus Partners",
    location: "Austin, TX",
    stages: ["Series A", "Series B+"],
    sectors: ["SaaS", "DeepTech"],
    checkSize: "$5M - $15M",
    thesis: "Scaling proven B2B business models and accelerating go-to-market for technically complex deep tech platforms.",
  },
];

export async function getInvestors(): Promise<Investor[]> {
  const delay = Math.floor(Math.random() * 600) + 300;
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  return MOCK_INVESTORS;
}

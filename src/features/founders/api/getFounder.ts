import { Founder } from "../types";

// Mock Data
const MOCK_FOUNDERS: Record<string, Founder> = {
  "1": {
    id: "1",
    name: "Dev Tribhuwan",
    headline: "Building the Operating System for Entrepreneurship",
    bio: "Serial entrepreneur passionate about removing friction from the startup journey. Previously built and scaled two B2B SaaS platforms. Now focused on unifying founders, creators, and investors through Thrivo.",
    location: "San Francisco, CA",
    socials: {
      twitter: "https://twitter.com/devtribhuwan",
      linkedin: "https://linkedin.com/in/devtribhuwan",
    },
    metrics: {
      totalRaised: "$12.5M",
      exits: 1,
      startupsFounded: 3,
    },
    startups: [
      {
        id: "s1",
        name: "Thrivo",
        description:
          "The unified platform connecting founders, creators, investors, and consumers.",
        role: "Founder & CEO",
        status: "Active",
        metrics: {
          raised: "$4.5M",
        },
      },
      {
        id: "s2",
        name: "Ambixion Corp",
        description:
          "Parent company incubating next-gen startup infrastructure.",
        role: "Founder",
        status: "Active",
      },
      {
        id: "s3",
        name: "PrevSaaS",
        description: "B2B Analytics tool for mid-market.",
        role: "Co-founder",
        status: "Acquired",
        metrics: {
          arr: "$2M+",
        },
      },
    ],
  },
  "2": {
    id: "2",
    name: "Alex Chen",
    headline: "AI Researcher turned Founder",
    bio: "Ex-DeepMind researcher building applied AI tools for developers. Obsessed with developer experience and generative models.",
    location: "London, UK",
    socials: {
      twitter: "https://twitter.com/alexchen",
    },
    metrics: {
      totalRaised: "$2M",
      exits: 0,
      startupsFounded: 1,
    },
    startups: [
      {
        id: "s4",
        name: "NeuralDev",
        description:
          "AI pair programmer that understands your entire codebase context.",
        role: "CEO & Co-founder",
        status: "Active",
        metrics: {
          users: "10,000+",
          raised: "$2M",
        },
      },
    ],
  },
};

/**
 * Simulates fetching a founder profile by ID with a network delay.
 */
export async function getFounderById(id: string): Promise<Founder> {
  // Simulate network latency (500ms to 1.5s)
  const delay = Math.floor(Math.random() * 1000) + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const founder = MOCK_FOUNDERS[id];

  if (!founder) {
    throw new Error("Founder not found");
  }

  return founder;
}

/**
 * Simulates fetching a list of featured founders.
 */
export async function getFeaturedFounders(): Promise<Founder[]> {
  const delay = Math.floor(Math.random() * 800) + 400;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return Object.values(MOCK_FOUNDERS);
}

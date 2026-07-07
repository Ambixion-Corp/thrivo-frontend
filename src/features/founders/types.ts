export interface Startup {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  role: string;
  status: "Active" | "Acquired" | "Failed";
  metrics?: {
    raised?: string;
    arr?: string;
    users?: string;
  };
}

export interface Founder {
  id: string;
  name: string;
  headline: string;
  bio: string;
  avatarUrl?: string;
  location: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  metrics: {
    totalRaised: string;
    exits: number;
    startupsFounded: number;
  };
  startups: Startup[];
}

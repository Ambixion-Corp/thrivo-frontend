export interface PortfolioCompany {
  id: string;
  name: string;
  logoUrl?: string;
  industry: string;
  stage: string;
  description: string;
}

export interface InvestmentThesis {
  focusSectors: string[];
  checkSize: {
    min: number;
    max: number;
  };
  preferredStages: string[];
  description: string;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  fundName: string;
  tagline: string;
  logoUrl?: string;
  websiteUrl?: string;
  location: string;
  aum?: number; // Assets Under Management in millions
  thesis: InvestmentThesis;
  portfolio: PortfolioCompany[];
}

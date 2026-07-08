export type InvestmentStage = "Pre-seed" | "Seed" | "Series A" | "Series B+";
export type InvestmentSector =
  "AI" | "SaaS" | "Fintech" | "Consumer" | "DeepTech";

export interface Investor {
  id: string;
  name: string;
  firmName: string;
  avatarUrl?: string;
  location: string;
  stages: InvestmentStage[];
  sectors: InvestmentSector[];
  checkSize: string;
  thesis: string;
}

import { StartupProfile } from "../types";

export async function getStartupById(id: string): Promise<StartupProfile> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data generator based on ID
  return {
    id,
    name: `Venture ${id.replace(/\D/g, "") || "X"}`,
    logo: `V`,
    oneLiner: "Revolutionizing the way we think about modern industry with AI.",
    description:
      "We are building the next generation of tools for the creators of tomorrow. Our platform uses advanced AI to synthesize workflows and optimize output, saving teams hundreds of hours per week. By combining large language models with deterministic logic, we ensure 100% accuracy in mission-critical applications.",
    stage: "Series A",
    tags: ["AI", "SaaS", "B2B"],
    founderIds: ["1", "2"], // Links to our mock founders
    publicMetrics: [
      { label: "Founded", value: "2023", isPrivate: false },
      { label: "Team Size", value: "12", isPrivate: false },
      { label: "Total Raised", value: "$5.5M", isPrivate: false },
    ],
    privateMetrics: [
      {
        label: "Monthly Recurring Revenue",
        value: "$125,000",
        isPrivate: true,
      },
      { label: "Customer Acquisition Cost", value: "$450", isPrivate: true },
      { label: "Lifetime Value", value: "$12,000", isPrivate: true },
      { label: "Burn Rate", value: "$180k/mo", isPrivate: true },
    ],
  };
}

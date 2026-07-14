export interface Deal {
  id: string;
  startupId: string;
  startupName: string;
  startupAvatar: string;
  founderName: string;
  status: "Requested" | "Approved" | "Passed" | "Invested";
  requestedAt: string;
  dealSize?: string;
}

const mockDeals: Deal[] = [
  {
    id: "deal_1",
    startupId: "startup_1",
    startupName: "Thrivo",
    startupAvatar: "/startup_feed_1.png",
    founderName: "Dev Tribhuwan",
    status: "Approved",
    requestedAt: "2 days ago",
    dealSize: "$250k",
  },
  {
    id: "deal_2",
    startupId: "startup_2",
    startupName: "AeroDynamics",
    startupAvatar: "/startup_feed_2.png",
    founderName: "Alex Rivera",
    status: "Requested",
    requestedAt: "4 hours ago",
  },
];

export const getDeals = async (): Promise<Deal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockDeals;
};

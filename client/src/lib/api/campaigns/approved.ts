import { Campaign } from "@prisma/client";

type Campaigns = {
  campaigns: Campaign[];
};
const getApprovedCampaigns = async (): Promise<Campaigns> => {
  const res = await fetch("/api/campaign/approved");
  const response = await res.json();
  return response;
};

export const getUserApprovedCampaigns = async (
  id: string
): Promise<Campaigns> => {
  const res = await fetch(`/api/campaign/approved/${id}`);
  const response = await res.json();
  return response;
};
export default getApprovedCampaigns;

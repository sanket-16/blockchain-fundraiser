import { Campaign } from "@prisma/client";

type Campaigns = {
  campaigns: Campaign[];
};
const getWaitingCampaigns = async (): Promise<Campaigns> => {
  const res = await fetch("/api/campaign/waiting");
  const response = await res.json();
  return response;
};

export const getUserWaitingCampaigns = async (
  id: string
): Promise<Campaigns> => {
  const res = await fetch(`/api/campaign/waiting/${id}`);
  const response = await res.json();
  return response;
};
export default getWaitingCampaigns;

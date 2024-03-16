import { Campaign } from "@prisma/client";

type Campaigns = {
  campaigns: Campaign[];
};
const getWaitingCampaigns = async (): Promise<Campaigns> => {
  const res = await fetch("/api/campaign/get/waiting");
  const response = await res.json();
  return response;
};
export default getWaitingCampaigns;

import { Campaign } from "@prisma/client";

type Campaigns = {
  campaigns: Campaign[];
};
const getAllCampaigns = async (): Promise<Campaigns> => {
  const res = await fetch("/api/campaign/get");
  const response = await res.json();
  return response;
};
export default getAllCampaigns;

export type Campaign = {
  id: string;
  title: string;
  User: {
    wallet_id: string;
  };
  images: string[];
  category: string;
  Location: string;
  end_date: Date;
  total_amount: number;
  completed_amount: number;
  _count: {
    donations: number;
  };
};

type Campaigns = {
  campaigns: Campaign[];
};
const getAllCampaigns = async (): Promise<Campaigns> => {
  const res = await fetch("/api/campaign/get");
  const response = await res.json();
  return response;
};
export default getAllCampaigns;

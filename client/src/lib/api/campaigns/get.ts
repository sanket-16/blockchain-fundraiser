import { Donation } from "@prisma/client";

export type Campaign = {
  id: string;
  title: string;
  User: {
    wallet_id: string;
  } | null;
  category: string;
  description: string;
  created_at: Date;
  donations: Donation[];
  Location: string;
  end_date: Date;
  images: string[];
  total_amount: number;
  completed_amount: number;
  _count: {
    donations: number;
  };
};

const getCampaign = async (id: string): Promise<Campaign> => {
  const res = await fetch(`/api/campaign/${id}`);
  const response = await res.json();
  return response;
};
export default getCampaign;

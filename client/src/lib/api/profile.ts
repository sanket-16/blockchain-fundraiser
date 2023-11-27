import { Donation } from "@prisma/client";
import { Campaign } from "./campaigns/getAll";

export type User = {
  user: {
    id: string;
    name: string | null;
    wallet_id: string;
    campaigns: Campaign[];
    donations: Donation[];
    _count: {
      campaigns: number;
      donations: number;
    };
  };
};

const getProfile = async (): Promise<User> => {
  const res = await fetch(`/api/profile`);
  const response = await res.json();
  return response;
};
export default getProfile;

import { useState } from "react";

import FilterNav from "@/components/FilterNav";
import Card from "@/components/CampaignCard";
import { useQuery } from "react-query";
import getAllCampaigns from "@/lib/api/campaigns/getAll";

const CampaignPage = () => {
  const { data, status, isLoading } = useQuery({
    queryKey: ["get campaigns"],
    queryFn: () => getAllCampaigns(),
  });
  console.log(data);

  if (status === "loading") return "loading....";
  if (status === "error" || data === undefined) return "Something went wrong.";
  return (
    <div className="p-8">
      <FilterNav />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-4">
        {data.campaigns.map((campaign, index) => (
          <Card key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;

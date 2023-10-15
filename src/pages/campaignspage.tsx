import { useState } from "react";

import FilterNav from "@/components/FilterNav";
import Card from "@/components/CampaignCard";

const CampaignPage = () => {
  return (
    <div className={"flex  flex-col "}>
      <FilterNav />
      <Card />
    </div>
  );
};

export default CampaignPage;

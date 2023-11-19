import { useState } from "react";

import FilterNav from "@/components/FilterNav";
import Card from "@/components/CampaignCard";

const campaigns = [
  {
    id: 1,
    title: "Help for isarel",
    account: "0xA49277A2786131c46a8ee7998cD787C64D6A10A3",
    progress: "34%",
    backers: 24,
    status: true,
    image:
      "https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw=",
  },
  {
    id: 2,
    title: "Help for isarel",
    account: "0xA49277A2786131c46a8ee7998cD787C64D6A10A3",
    progress: "34%",
    backers: 24,
    status: true,
    image:
      "https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw=",
  },
  {
    id: 3,
    title: "Help for isarel",
    account: "0xA49277A2786131c46a8ee7998cD787C64D6A10A3",
    progress: "34%",
    backers: 24,
    status: true,
    image:
      "https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw=",
  },
  {
    id: 4,
    title: "Help for isarel",
    account: "0xA49277A2786131c46a8ee7998cD787C64D6A10A3",
    progress: "34%",
    backers: 24,
    status: true,
    image:
      "https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw=",
  },
];

const CampaignPage = () => {
  return (
    <div className="p-8">
      <FilterNav />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-4">
        {campaigns.map((campaign, index) => (
          <Card key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  );
};

export default CampaignPage;

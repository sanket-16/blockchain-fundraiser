import createPrismaClient from "@/lib/prisma";
import { Campaign } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ campaigns: Campaign[] }>
) {
  const prisma = createPrismaClient();
  const campaigns = await prisma.campaign.findMany();
  const date = new Date();
  const filteredCampaigns = campaigns.filter(
    (campaign) => campaign.end_date < date
  );
  if (filteredCampaigns.length !== 0) {
    filteredCampaigns.map((campaign) => {
      const updatedCampaign = prisma.campaign.update({
        where: {
          id: campaign.id,
        },
        data: {
          status: "Finished",
        },
      });
    });
  }
  prisma.$disconnect();

  res.status(200).json({ campaigns });
}

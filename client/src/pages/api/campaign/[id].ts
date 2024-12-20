import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const prisma = createPrismaClient();
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: String(id),
    },
  });
  prisma.$disconnect();

  if (!campaign) {
    throw new Error("Campaign not found.");
  }
  res.status(200).json(campaign);
}

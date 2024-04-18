import createPrismaClient from "@/lib/prisma";
import { Campaign } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ campaigns: Campaign[] }>
) {
  const { userId } = req.query;
  console.log(userId, "hee");
  const prisma = createPrismaClient();
  const campaigns = await prisma.campaign.findMany({
    where: {
      status: "Waiting",
      owner: String(userId),
    },
  });
  prisma.$disconnect();

  res.status(200).json({ campaigns });
}

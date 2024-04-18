import createPrismaClient from "@/lib/prisma";
import { Campaign } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ campaigns: Campaign[] }>
) {
  const prisma = createPrismaClient();
  const campaigns = await prisma.campaign.findMany({
    where: {
      status: "Waiting",
    },
  });

  prisma.$disconnect();

  res.status(200).json({ campaigns });
}

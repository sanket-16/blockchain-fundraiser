import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
// import { getNextAuthOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  // const { authOptions } = getNextAuthOptions(req);
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   throw new Error("Unauthorised");
  // }
  const { id, status } = await JSON.parse(req.body);
  const prisma = createPrismaClient();

  const campaign = await prisma.campaign.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  prisma.$disconnect();

  if (campaign) {
    res.status(200).json({ message: "Campaign updated successfully." });
  } else {
    res.status(400).json({ message: "Failed to update fundraiser." });
  }
}

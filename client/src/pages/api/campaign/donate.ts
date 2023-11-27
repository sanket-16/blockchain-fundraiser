import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getNextAuthOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const hashes = [
    "0x211e7c2844b1504e8723f80c4484b3051fe6f690bc9b8b199560b26af0c0c5eb",
    "0x234ssd2844b1504e8723f80c4484b3051fe6f690bc9b8b199560b26af0c0se5g",
    "0x214d7c2844b1504e8723f80c4484b3051fe6f690bc9b8b199560b26af0c0as4f",
  ];
  const randomElement = Math.floor(Math.random() * hashes.length);
  const { authOptions } = getNextAuthOptions(req);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new Error("Unauthorised");
  }
  const { campaignId, message, amount } = await JSON.parse(req.body);
  const prisma = createPrismaClient();
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
    select: {
      completed_amount: true,
      id: true,
    },
  });
  if (campaign) {
    const donation = await prisma.donation.create({
      data: {
        message,
        amount,
        transaction_hash: hashes[randomElement],
        User: {
          connect: {
            id: session.user.id,
          },
        },
        Campaign: {
          connect: {
            id: campaign.id,
          },
        },
      },
    });
    prisma.$disconnect();

    if (donation) {
      const updatedCampaign = await prisma.campaign.update({
        where: {
          id: campaign.id,
        },
        data: {
          completed_amount: campaign.completed_amount + donation.amount,
        },
      });
      prisma.$disconnect();
      if (updatedCampaign) {
        res.status(200).json({ message: "Donation done successfully!" });
      }
    }
  } else {
    prisma.$disconnect();
    throw new Error("No such fundraiser campaign exists.");
  }
  prisma.$disconnect();
}

import createPrismaClient from "@/lib/prisma";
import { Donation } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

type Campaign = {
  id: string;
  title: string;
  User: {
    wallet_id: string;
  } | null;
  category: string;
  description: string;
  created_at: Date;
  donations: Donation[];
  Location: string;
  end_date: Date;
  images: string[];
  total_amount: number;
  completed_amount: number;
  _count: {
    donations: number;
  };
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Campaign>
) {
  const { id } = req.query;
  const prisma = createPrismaClient();
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: String(id),
    },
    select: {
      id: true,
      title: true,
      User: {
        select: {
          wallet_id: true,
        },
      },
      description: true,
      created_at: true,
      donations: true,
      category: true,
      Location: true,
      end_date: true,
      total_amount: true,
      images: true,
      completed_amount: true,
      _count: {
        select: {
          donations: true,
        },
      },
    },
  });
  prisma.$disconnect();

  if (!campaign) {
    throw new Error("Campaign not found.");
  }
  res.status(200).json(campaign);
}

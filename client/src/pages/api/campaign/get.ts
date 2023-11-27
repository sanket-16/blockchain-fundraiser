import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

type Campaign = {
  id: string;
  title: string;
  User: {
    wallet_id: string;
  } | null;
  category: string;
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
  res: NextApiResponse<{ campaigns: Campaign[] }>
) {
  const prisma = createPrismaClient();
  const campaigns = await prisma.campaign.findMany({
    select: {
      id: true,
      title: true,
      User: {
        select: {
          wallet_id: true,
        },
      },
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

  res.status(200).json({ campaigns });
}

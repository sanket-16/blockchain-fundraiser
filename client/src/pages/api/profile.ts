import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getNextAuthOptions } from "./auth/[...nextauth]";
import { Donation } from "@prisma/client";

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

type User = {
  user: {
    id: string;
    name: string | null;
    wallet_id: string;
    campaigns: Campaign[];
    donations: Donation[];
    _count: {
      campaigns: number;
      donations: number;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { authOptions } = getNextAuthOptions(req);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new Error("Unauthorised");
  }

  const prisma = createPrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      wallet_id: true,
      campaigns: {
        include: {
          donations: true,
          User: {
            select: {
              wallet_id: true,
            },
          },
          _count: {
            select: {
              donations: true,
            },
          },
        },
      },
      donations: true,
      _count: {
        select: {
          campaigns: true,
          donations: true,
        },
      },
    },
  });
  if (user) {
    res.status(200).json({ user });
  } else {
    throw new Error("Failed to fetch user!");
  }
}

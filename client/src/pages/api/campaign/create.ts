import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getNextAuthOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { authOptions } = getNextAuthOptions(req);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    throw new Error("Unauthorised");
  }
  const { title, description, category, amount, date, Location, images } =
    await JSON.parse(req.body);
  const prisma = createPrismaClient();
  const end_date = new Date(date);
  const campaign = await prisma.campaign.create({
    data: {
      title,
      description,
      completed_amount: 0,
      total_amount: amount,
      end_date,
      Location: "somewhere",
      category: "Business",
      created_at: new Date(),
      status: "Waiting",
      images: images,
      User: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });
  if (campaign) {
    res.status(200).json({ message: "Campaign created successfully." });
  } else {
    res.status(400).json({ message: "Failed to create fundraiser." });
  }
}

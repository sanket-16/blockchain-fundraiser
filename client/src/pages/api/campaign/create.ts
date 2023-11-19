import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { title, description, category, total_amount, end_date, Location } =
    await JSON.parse(req.body);
  const prisma = createPrismaClient();
  const campaign = prisma.campaign.create({
    data: {
      title,
      description,
      category,
      completed_amount: 0,
      total_amount,
      end_date,
      Location,
      created_at: new Date(),
    },
  });
  res.status(200).json({ message: "John Doe" });
}

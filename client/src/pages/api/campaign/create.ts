import createPrismaClient from "@/lib/prisma";
import sendMail from "@/lib/sendEmail";
import CampaignCreation from "@/components/Emails/CampaignCreation";
import type { NextApiRequest, NextApiResponse } from "next";
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
  const {
    title,
    description,
    category,
    target,
    date,
    location,
    images,
    proof,
    email,
    owner,
  } = await JSON.parse(req.body);
  const prisma = createPrismaClient();
  const end_date = new Date(date);
  const campaign = await prisma.campaign.create({
    data: {
      title,
      description,
      email,
      target,
      end_date,
      location,
      category,
      created_at: new Date(),
      status: "Waiting",
      images: images,
      proof,
      owner,
    },
  });
  prisma.$disconnect();

  if (campaign) {
    if (email.length !== 0) {
      const { render, transporter } = sendMail();
      const emailHtml = render(CampaignCreation());
      const options = {
        from: "help@fundme.com",
        to: email,
        subject: "Good morning",
        html: emailHtml,
      };
      await transporter.sendMail(options);
    }
    res.status(200).json({ message: "Campaign created successfully." });
  } else {
    res.status(400).json({ message: "Failed to create fundraiser." });
  }
}

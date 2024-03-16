import createPrismaClient from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getNextAuthOptions } from "./auth/[...nextauth]";
// import { Donation } from "@prisma/client";
import { compare, compareSync } from "bcryptjs";

const password = process.env.PASSWORD as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { authOptions } = getNextAuthOptions(req);
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   throw new Error("Unauthorised");
  // }

  // const prisma = createPrismaClient();

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: session.user.id,
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     wallet_id: true,
  //     campaigns: {
  //       include: {
  //         donations: true,
  //         User: {
  //           select: {
  //             wallet_id: true,
  //           },
  //         },
  //         _count: {
  //           select: {
  //             donations: true,
  //           },
  //         },
  //       },
  //     },
  //     donations: true,
  //     _count: {
  //       select: {
  //         campaigns: true,
  //         donations: true,
  //       },
  //     },
  //   },
  // });
  // prisma.$disconnect();

  // if (user) {
  //   res.status(200).json({ user });
  // } else {
  //   throw new Error("Failed to fetch user!");
  // }
  if (req.method === "POST") {
    const { pass } = await JSON.parse(req.body);
    console.log("here", pass);
    const response = await compareSync(password, pass);
    console.log(response);
    if (response) {
      res.status(200).json({ message: "Successfully authenticated." });
    } else {
      res.status(400).json({ message: "Authentication failed." });
    }
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { compare, compareSync } from "bcryptjs";

const password = process.env.PASSWORD as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

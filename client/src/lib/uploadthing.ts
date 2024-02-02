import { getNextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authOptions } = getNextAuthOptions(req);
  const auth = await getServerSession(req, res, authOptions);
  return auth;
};

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete");

    console.log("file url", file.url);
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

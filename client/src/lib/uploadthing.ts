import { getNextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authOptions } = getNextAuthOptions(req);
  const auth = await getServerSession(req, res, authOptions);
  return auth;
}; // Fake auth function

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async ({ req, res }) => {
      const user = await auth(req, res);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(String(process.env.NEXTAUTH_URL));
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req: { headers: req.headers } }),
          });

          if (result.success) {
            const user = await prisma.user.findUnique({
              where: {
                wallet_id: result.data.address,
              },
            });
            if (user) {
              return user;
            } else {
              const newUser = await prisma.user.create({
                data: {
                  wallet_id: result.data.address,
                },
              });
              return newUser;
            }
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers,
    session: {
      strategy: "jwt",
    },
    secret: String(process.env.NEXTAUTH_SECRET),
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
        });
        if (user === null) {
          throw new Error("Something went wrong");
        }
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.wallet_id = user.wallet_id;
        return session;
      },

      async jwt({ token, user }: { token: any; user: any }) {
        return token;
      },
    },
  };
  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}

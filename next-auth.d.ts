import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      wallet_id: string;
      name: string?;
    };
  }
}

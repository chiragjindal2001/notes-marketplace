import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    error?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

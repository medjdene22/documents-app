import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db";
import authConfig from "./auth.config"
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";

declare module "next-auth" {

  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {

    async session({ session, token }) {

      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole
      }
      return session
    },

    async jwt({ token,}) {

      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)
      token.role = existingUser?.role
      return token
    }, 

  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
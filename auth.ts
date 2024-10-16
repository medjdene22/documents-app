import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db";
import authConfig from "./auth.config"
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";

declare module "next-auth" {

  interface Session {
    user: {
      role: UserRole,
      matricule : string
    } & DefaultSession["user"]
  }
}

export type ExtendingUser ={
    role: UserRole,
    matricule : string
  } & DefaultSession["user"]

 
export const { auth, handlers, signIn, signOut } = NextAuth({

  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },

  callbacks: {
    async signIn({ user, account }) {

      if (account?.provider !== "credentials") return true
      if(!user.id) return false

      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false

      return true
    },

    async session({ session, token }) {

      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (session.user && token.role) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.name = token.name
        session.user.matricule = token.matricule as string
      }

      return session
    },

    async jwt({ token,}) {

      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)
      token.role = existingUser?.role
      token.matricule = existingUser?.matricule
      token.name = existingUser?.name

      return token
    }, 

  },


  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "./db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "./auth.config"
import { getUserById } from "@/data/user";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {

  interface Session {
    user: {
      roles: "USER" | "ADMIN",
      matricule : string
    } & DefaultSession["user"]
  }
}

export type ExtendingUser ={
    roles: "USER" | "ADMIN",
    matricule : string
  } & DefaultSession["user"]

 
export const { auth, handlers, signIn, signOut } = NextAuth({

  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
  },

  events: {
    async linkAccount({ user }) {

      await db.update(users).set({
        emailVerified: new Date()
      }).where(
        eq(users.id, user.id as string) 
      )

      
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

      if (session.user && token.roles) {
        session.user.roles = token.roles as "USER" | "ADMIN"
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
      token.roles = existingUser?.roles
      token.matricule = existingUser?.matricule
      token.name = existingUser?.name

      return token
    }, 

  },


  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})


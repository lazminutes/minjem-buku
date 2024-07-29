import authConfig from "@/auth.config"
import { db } from "@/db"
import { User } from "@/db/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as User["role"]
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, token.sub as string),
      })

      if (!existUser) return token
      token.role = existUser.role
      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
})

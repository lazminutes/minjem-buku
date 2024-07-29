import { User } from "@/db/schema"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendUser = DefaultSession["user"] & {
  role: User["role"]
}

declare module "next-auth" {
  interface Session {
    user: ExtendUser
  }
}

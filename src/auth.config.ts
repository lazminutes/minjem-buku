import { db } from "@/db"
import bcrypt from "bcryptjs"
import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { loginSchema } from "@/lib/validations/auth"

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
          })

          if (!user) return null

          const passwordMatch = await bcrypt.compare(
            password,
            user.password as string
          )

          if (passwordMatch) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig

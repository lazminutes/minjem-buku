"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { signIn } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { takeFirstOrThrow } from "@/db/utils"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { AuthError } from "next-auth"
import * as z from "zod"

import { getErrorMessage } from "@/lib/handle-error"
import { loginSchema, registerSchema } from "@/lib/validations/auth"

export const register = async (input: z.infer<typeof registerSchema>) => {
  noStore()
  try {
    const hashedPassword = await bcrypt.hash(input.password, 10)

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1)

    if (existingUser.length > 0) {
      return {
        data: null,
        error: "Email sudah terdaftar",
      }
    }

    await db.transaction(async (tx) => {
      await tx
        .insert(users)
        .values({
          name: input.name,
          email: input.email,
          password: hashedPassword,
          role: "siswa",
        })
        .returning({
          id: users.id,
        })
        .then(takeFirstOrThrow)
    })

    revalidatePath("/")
    return {
      data: null,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export const login = async (input: z.infer<typeof loginSchema>) => {
  noStore()
  const validatedFields = loginSchema.safeParse(input)

  if (!validatedFields.success) {
    return {
      data: null,
      error: "Email atau password salah",
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
    })
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            data: null,
            error: "Email atau password salah",
          }
        default:
          return {
            data: null,
            error: "Something went wrong",
          }
      }
    }
    throw err
  }
}

"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "@/lib/handle-error"
import { UpdateUserSchema } from "@/lib/validations/users"

export async function updateUser(input: UpdateUserSchema & { id: string }) {
  noStore()
  try {
    await db
      .update(users)
      .set({
        name: input.name,
        email: input.email,
        role: input.role,
      })
      .where(eq(users.id, input.id))

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

export async function deleteUser(input: { id: string }) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(users).where(eq(users.id, input.id))
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

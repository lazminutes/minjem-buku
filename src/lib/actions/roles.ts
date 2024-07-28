"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { roles } from "@/db/schema"
import { takeFirstOrThrow } from "@/db/utils"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "@/lib/handle-error"
import { CreateRoleSchema, UpdateRoleSchema } from "@/lib/validations/roles"

export async function createRole(input: CreateRoleSchema) {
  noStore()
  try {
    await db.transaction(async (tx) => {
      await tx
        .insert(roles)
        .values({
          name: input.name,
        })
        .returning({
          id: roles.id,
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

export async function updateRole(input: UpdateRoleSchema & { id: string }) {
  noStore()
  try {
    await db
      .update(roles)
      .set({
        name: input.name,
      })
      .where(eq(roles.id, input.id))

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

export async function deleteRole(input: { id: string }) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(roles).where(eq(roles.id, input.id))
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

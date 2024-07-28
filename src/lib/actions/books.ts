"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { books } from "@/db/schema"
import { takeFirstOrThrow } from "@/db/utils"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "@/lib/handle-error"
import { CreateBookSchema, UpdateBookSchema } from "@/lib/validations/books"

export async function createBook(input: CreateBookSchema) {
  noStore()
  try {
    await db.transaction(async (tx) => {
      await tx
        .insert(books)
        .values({
          title: input.title,
          author: input.author,
          quantity: input.quantity,
          image: input.image,
        })
        .returning({
          id: books.id,
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

export async function updateBook(input: UpdateBookSchema & { id: string }) {
  noStore()
  try {
    await db
      .update(books)
      .set({
        title: input.title,
        author: input.author,
        image: input.image,
        quantity: input.quantity,
      })
      .where(eq(books.id, input.id))

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

export async function deleteBook(input: { id: string }) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(books).where(eq(books.id, input.id))
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

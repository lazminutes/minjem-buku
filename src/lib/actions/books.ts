"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { books } from "@/db/schema"
import { takeFirstOrThrow } from "@/db/utils"
import { count, desc, eq } from "drizzle-orm"

import { getErrorMessage } from "@/lib/handle-error"
import { UpdateBookSchema } from "@/lib/validations/books"

export async function createBook(input: any) {
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
        title: input.title as string,
        author: input.author as string,
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

export async function updateImage(input: UpdateBookSchema) {
  noStore()
  try {
    const lastBook = await db
      .select()
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(1)
      .then((results) => results[0])

    if (!lastBook) {
      return {
        data: null,
        error: "No book found",
      }
    }
    await db
      .update(books)
      .set({
        image: input.image,
      })
      .where(eq(books.id, lastBook.id))

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

export async function editImage(input: UpdateBookSchema) {
  noStore()
  try {
    await db
      .update(books)
      .set({
        image: input.image,
      })
      .where(eq(books.id, input.id as string))

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

export async function getTotalBooksCount() {
  try {
    const totalBooks = await db
      .select({
        total: count(),
      })
      .from(books)
      .then((results) => results[0]?.total ?? 0)

    return totalBooks
  } catch (err) {
    console.log(err)
    throw new Error(`Gagal`)
  }
}

"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { books, loans } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

import { getErrorMessage } from "@/lib/handle-error"

export async function kembalikan(input: any) {
  noStore()
  try {
    const existingLoan = await db
      .select()
      .from(loans)
      .where(eq(loans.id, input.id))
      .then((results) => results[0])

    if (!existingLoan) {
      return {
        data: null,
        error: getErrorMessage("Anda tidak pernah meminjam buku ini"),
      }
    }

    await db.transaction(async (tx) => {
      await tx.delete(loans).where(eq(loans.id, input.id))

      await tx
        .update(books)
        .set({ quantity: sql`${books.quantity} + 1` })
        .where(eq(books.id, input.bookId))
    })

    revalidatePath("/")
    return {
      data: null,
      error: null,
    }
  } catch (err) {
    console.log(err)
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

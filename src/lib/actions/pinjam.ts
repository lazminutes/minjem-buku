"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { books, loans } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

import { getErrorMessage } from "@/lib/handle-error"

export async function pinjam(input: any) {
  noStore()
  try {
    const existingLoan = await db
      .select()
      .from(loans)
      .where(
        sql`${loans.userId} = ${input.userId} and ${loans.bookId} = ${input.bookId}`
      )
      .then((results) => results[0])

    if (existingLoan) {
      return {
        data: null,
        error: getErrorMessage(
          "Anda pernah pinjam buku ini sebelumnnya dan belum anda kembalikan"
        ),
      }
    }

    await db.transaction(async (tx) => {
      await tx.insert(loans).values({
        userId: input.userId,
        returnDate: input.returnDate,
        bookId: input.bookId,
      })

      await tx
        .update(books)
        .set({ quantity: sql`${books.quantity} - 1` })
        .where(eq(books.id, input.bookId))
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

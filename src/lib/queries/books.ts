import "server-only"

import { db } from "@/db"
import { books } from "@/db/schema"
import { asc, count } from "drizzle-orm"
import { unstable_noStore as noStore } from "next/cache"

import { GetBooksSchema } from "@/lib/validations/books"


export async function getBooks(input: GetBooksSchema) {
  noStore()
  const { page, per_page} = input

  try {
    const offset = (page - 1) * per_page
    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(books)
        .limit(per_page)
        .offset(offset)
        .orderBy(
         asc(books.title)
        )

      const total = await tx
        .select({
          count: count(),
        })
        .from(books)
        .execute()
        .then((res) => res[0]?.count ?? 0)

      return {
        data,
        total,
      }
    })

    const pageCount = Math.ceil(total / per_page)
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}
import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { db } from "@/db"
import { books, loans, User } from "@/db/schema"
import { asc, count, eq } from "drizzle-orm"

import { GetBooksSchema } from "@/lib/validations/books"

export async function getPinjaman(input: GetBooksSchema, user: User) {
  noStore()
  const { page, per_page } = input

  try {
    const offset = (page - 1) * per_page
    const { data, total } = await db.transaction(async (tx) => {
      let data = [] as any
      let total = 0
      if (user?.role == "siswa") {
        data = await tx
          .select({
            id: loans.id,
            title: books.title,
            author: books.author,
            bookId: books.id,
            loanDate: loans.loanDate,
            returnDate: loans.returnDate,
          })
          .from(loans)
          .leftJoin(books, eq(loans.bookId, books.id))
          .where(eq(loans.userId, user.id))
          .limit(per_page)
          .offset(offset)
          .orderBy(asc(books.title))
      } else if (user?.role == "superadmin") {
        data = await tx
          .select({
            title: books.title,
            author: books.author,
            loanDate: loans.loanDate,
            returnDate: loans.returnDate,
          })
          .from(loans)
          .leftJoin(books, eq(loans.bookId, books.id))
          .limit(per_page)
          .offset(offset)
          .orderBy(asc(books.title))
      }

      if (user?.role == "siswa") {
        total = await tx
          .select({
            count: count(),
          })
          .from(loans)
          .where(eq(loans.userId, user.id))
          .execute()
          .then((res) => res[0]?.count ?? 0)
      } else if (user?.role == "superadmin") {
        total = await tx
          .select({
            count: count(),
          })
          .from(loans)
          .execute()
          .then((res) => res[0]?.count ?? 0)
      }

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

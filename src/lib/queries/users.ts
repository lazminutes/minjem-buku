import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { db } from "@/db"
import { users } from "@/db/schema"
import { asc, count } from "drizzle-orm"

import { GetUsersSchema } from "@/lib/validations/users"

export async function getUsers(input: GetUsersSchema) {
  noStore()
  const { page, per_page } = input

  try {
    const offset = (page - 1) * per_page
    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(users)
        .limit(per_page)
        .offset(offset)
        .orderBy(asc(users.role))

      const total = await tx
        .select({
          count: count(),
        })
        .from(users)
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

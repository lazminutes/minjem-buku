import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { db } from "@/db"
import { roles } from "@/db/schema"
import { asc, count } from "drizzle-orm"

import { GetRolesSchema } from "@/lib/validations/roles"

export async function getRoles(input: GetRolesSchema) {
  noStore()
  const { page, per_page } = input

  try {
    const offset = (page - 1) * per_page
    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(roles)
        .limit(per_page)
        .offset(offset)
        .orderBy(asc(roles.name))

      const total = await tx
        .select({
          count: count(),
        })
        .from(roles)
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

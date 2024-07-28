import { lifecycleDates } from "@/db/schema/utils"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"

export const roles = pgTable("roles", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  name: text("name").notNull().unique(),
  ...lifecycleDates,
})

export type Role = typeof roles.$inferSelect
export type NewRole = typeof roles.$inferInsert

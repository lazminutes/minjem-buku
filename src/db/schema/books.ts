import { lifecycleDates } from "@/db/schema/utils"
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"

export const books = pgTable("books", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  image: text("image"),
  quantity: integer("quantity").default(1),
  ...lifecycleDates,
})

export type Book = typeof books.$inferSelect
export type NewBook = typeof books.$inferInsert

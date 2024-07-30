import { books } from "@/db/schema/books"
import { users } from "@/db/schema/users"
import { lifecycleDates } from "@/db/schema/utils"
import { relations } from "drizzle-orm"
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"

export const loans = pgTable("loans", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  userId: varchar("user_id", { length: 30 }).references(() => users.id, {
    onDelete: "cascade",
  }),
  bookId: varchar("book_id", { length: 30 }).references(() => books.id, {
    onDelete: "cascade",
  }),
  loanDate: timestamp("loan_date").defaultNow(),
  returnDate: timestamp("return_date"),
  ...lifecycleDates,
})

export type Loans = typeof loans.$inferSelect
export type NewLoans = typeof loans.$inferInsert

export const loansRelations = relations(loans, ({ one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [loans.bookId],
    references: [books.id],
  }),
}))

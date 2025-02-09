import { loans } from "@/db/schema/loans"
import { lifecycleDates } from "@/db/schema/utils"
import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

import { generateId } from "@/lib/id"

export const users = pgTable("users", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  role: varchar("role", {
    length: 30,
    enum: ["superadmin", "siswa"],
  }),
  ...lifecycleDates,
})
export const usersRelations = relations(users, ({ many }) => ({
  loans: many(loans),
}))

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

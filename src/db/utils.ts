import { pgTableCreator } from "drizzle-orm/pg-core"

export const pgTable = pgTableCreator((name) => `lazminutes_${name}`)

export function takeFirst<T>(items: T[]) {
  return items.at(0)
}

export function takeFirstOrThrow<T>(items: T[]) {
  const first = takeFirst(items)

  if (!first) {
    throw new Error("First item not found")
  }

  return first
}

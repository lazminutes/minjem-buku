import * as z from "zod"

import { searchParamsSchema } from "./search-params-schema"

export const getBooksSchema = searchParamsSchema
export type GetBooksSchema = z.infer<typeof getBooksSchema>

export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  image: z.string().optional(),
  quantity: z
    .union([
      z.coerce
        .number({
          message: "must be a number",
        })
        .int({
          message: "must be a whole number",
        })
        .positive({
          message: "must be positive",
        }),
      z.literal(""),
    ])
    .optional(),
})

export type CreateBookSchema = z.infer<typeof createBookSchema>

export const updateBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  image: z.string().optional(),
  quantity: z
    .union([
      z.coerce
        .number({
          message: "must be a number",
        })
        .int({
          message: "must be a whole number",
        })
        .positive({
          message: "must be positive",
        }),
      z.literal(""),
    ])
    .optional(),
})

export type UpdateBookSchema = z.infer<typeof updateBookSchema>

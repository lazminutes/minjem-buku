import * as z from "zod"

import { searchParamsSchema } from "./search-params-schema"

export const getPinjamSchema = searchParamsSchema
export type GetPinjamSchema = z.infer<typeof getPinjamSchema>

export const pinjamSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  returnDate: z.string(),
  loanDate: z.string(),
})

export type PinjamSchema = z.infer<typeof pinjamSchema>

export const updateBookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  author: z.string().min(1),
  image: z.string(),

  quantity: z.coerce.number().int().optional(),
})

export type UpdateBookSchema = z.infer<typeof updateBookSchema>

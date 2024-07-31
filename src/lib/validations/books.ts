import * as z from "zod"

import { searchParamsSchema } from "./search-params-schema"

export const getBooksSchema = searchParamsSchema
export type GetBooksSchema = z.infer<typeof getBooksSchema>

export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  image: z.array(z.instanceof(File)),
  quantity: z.coerce.number().int().optional().nullable(),
})

export type CreateBookSchema = z.infer<typeof createBookSchema>

export const updateBookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).optional().nullable(),
  author: z.string().min(1).optional().nullable(),
  image: z.array(z.instanceof(File)),

  quantity: z.coerce.number().int().optional(),
})

export type UpdateBookSchema = z.infer<typeof updateBookSchema>

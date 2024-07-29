import { users } from "@/db/schema"
import * as z from "zod"

import { searchParamsSchema } from "./search-params-schema"

export const getUsersSchema = searchParamsSchema
export type GetUsersSchema = z.infer<typeof getUsersSchema>

export const createUserSchema = z.object({
  name: z.string().min(1),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).optional().nullable(),
  email: z.string().min(1).optional().nullable(),
  role: z.enum(users.role.enumValues).optional().nullable(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>

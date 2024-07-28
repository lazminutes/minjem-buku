import * as z from "zod"

import { searchParamsSchema } from "./search-params-schema"

export const getRolesSchema = searchParamsSchema
export type GetRolesSchema = z.infer<typeof getRolesSchema>

export const createRoleSchema = z.object({
  name: z.string().min(1).toUpperCase(),
})

export type CreateRoleSchema = z.infer<typeof createRoleSchema>

export const updateRoleSchema = z.object({
  name: z.string().min(1).toUpperCase(),
})

export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>

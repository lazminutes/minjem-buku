"use client"

import { CreateRoleDialog } from "./create-role-dialog"

export function RolesTableToolbarActions() {
  return (
    <div className="flex items-center justify-end">
      <CreateRoleDialog />
    </div>
  )
}

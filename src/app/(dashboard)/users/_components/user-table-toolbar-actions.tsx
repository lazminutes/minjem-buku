"use client"

import { CreateUserDialog } from "./create-user-dialog"

export function UsersTableToolbarActions() {
  return (
    <div className="flex items-center justify-end">
      <CreateUserDialog />
    </div>
  )
}

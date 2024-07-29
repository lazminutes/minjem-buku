"use client"

import * as React from "react"
import { users, type User } from "@/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { updateUser } from "@/lib/actions/users"
import { getErrorMessage } from "@/lib/handle-error"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeleteUserDialog } from "./delete-user-dialog"
import { UpdateUserSheet } from "./update-user-sheet"

export function getColumns(): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: () => <span>Nama</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate font-medium">{row.getValue("name")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: () => <span>Email</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: () => <span>Role</span>,
      cell: ({ row }) => {
        return (
          <div>
            {
              <Badge className="uppercase" variant="outline">
                {row.getValue("role")}
              </Badge>
            }
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateUserSheet, setShowUpdateUserSheet] =
          React.useState(false)
        const [showDeleteUserDialog, setShowDeleteUserDialog] =
          React.useState(false)

        return (
          <div className="flex items-center gap-2">
            <UpdateUserSheet
              open={showUpdateUserSheet}
              onOpenChange={setShowUpdateUserSheet}
              user={row.original}
            />
            <DeleteUserDialog
              open={showDeleteUserDialog}
              onOpenChange={setShowDeleteUserDialog}
              user={row.original}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowUpdateUserSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Ubah Role</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={`${row.original.role}`}
                      onValueChange={(value) => {
                        startUpdateTransition(() => {
                          toast.promise(
                            updateUser({
                              id: row.original.id,
                              role: value as User["role"],
                            }),
                            {
                              loading: "Updating...",
                              success: "Role berhasil diubah",
                              error: (err) => getErrorMessage(err),
                            }
                          )
                        })
                      }}
                    >
                      {users.role.enumValues.map((label) => (
                        <DropdownMenuRadioItem
                          key={label}
                          value={label}
                          className="uppercase"
                          disabled={isUpdatePending}
                        >
                          {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteUserDialog(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}

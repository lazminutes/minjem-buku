"use client"

import * as React from "react"
import { Role } from "@/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeleteRoleDialog } from "./delete-role-dialog"
import { UpdateRoleSheet } from "./update-role-sheet"

export function getColumns(): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "name",
      header: () => <span>Role</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate font-medium">{row.getValue("name")}</span>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showUpdateRoleSheet, setShowUpdateRoleSheet] =
          React.useState(false)
        const [showDeleteRoleDialog, setShowDeleteRoleDialog] =
          React.useState(false)

        return (
          <div className="flex items-center gap-2">
            <UpdateRoleSheet
              open={showUpdateRoleSheet}
              onOpenChange={setShowUpdateRoleSheet}
              role={row.original}
            />
            <DeleteRoleDialog
              open={showDeleteRoleDialog}
              onOpenChange={setShowDeleteRoleDialog}
              role={row.original}
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
                <DropdownMenuItem onSelect={() => setShowUpdateRoleSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteRoleDialog(true)}
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

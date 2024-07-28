"use client"

import * as React from "react"
import { type User } from "@/db/schema"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
          <div>{<Badge variant="outline">{row.getValue("role")}</Badge>}</div>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateUserSheet, setShowUpdateUserSheet] =
          React.useState(false)

        return (
          <div className="flex items-center gap-2">
            <UpdateUserSheet
              open={showUpdateUserSheet}
              onOpenChange={setShowUpdateUserSheet}
              user={row.original}
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Ganti Role</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={`${row.original.role}`}
                      // onValueChange={(value) => {
                      //   startUpdateTransition(() => {
                      //     toast.promise(
                      //       updateTask({
                      //         id: row.original.id,
                      //         label: value as Task["label"],
                      //       }),
                      //       {
                      //         loading: "Updating...",
                      //         success: "Label updated",
                      //         error: (err) => getErrorMessage(err),
                      //       }
                      //     )
                      //   })
                      // }}
                    >
                      {/* {roles.name.map((label) => ( */}
                      <DropdownMenuRadioItem
                        key={`SUPERADMIN`}
                        value={`SUPERADMIN`}
                        className="capitalize"
                        disabled={isUpdatePending}
                      >
                        {/* {label} */}
                        SUPERADMIN
                      </DropdownMenuRadioItem>
                      {/* ))} */}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}

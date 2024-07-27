"use client"

import * as React from "react"
import { type Book } from "@/db/schema"
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
import { PreviewBooksDialog } from "@/app/(dashboard)/books/_components/preview-book-dialog"

import { DeleteBooksDialog } from "./delete-books-dialog"
import { UpdateBookSheet } from "./update-book-sheet"

export function getColumns(): ColumnDef<Book>[] {
  return [
    {
      accessorKey: "title",
      header: () => <span>Judul</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "author",
      header: () => <span>Pengarang</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate font-medium">
              {row.getValue("author")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "quantity",
      header: () => <span>Buku yang Tersedia</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="truncate font-medium">
              {row.getValue("quantity")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "borrow",
      header: () => <span>Pinjam</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            {row.getValue("quantity") ? (
              <Button>Pinjam Buku</Button>
            ) : (
              <span className="truncate font-medium">Kosong</span>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateBookSheet, setShowUpdateBookSheet] =
          React.useState(false)
        const [showDeleteBookDialog, setShowDeleteBookDialog] =
          React.useState(false)
        const [previewBookDialog, setPreviewBookDialog] = React.useState(false)

        return (
          <div className="flex items-center gap-2">
            <UpdateBookSheet
              open={showUpdateBookSheet}
              onOpenChange={setShowUpdateBookSheet}
              book={row.original}
            />
            <DeleteBooksDialog
              open={showDeleteBookDialog}
              onOpenChange={setShowDeleteBookDialog}
              book={row.original}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <PreviewBooksDialog
              open={previewBookDialog}
              onOpenChange={setPreviewBookDialog}
              book={row.original}
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
                <DropdownMenuItem onSelect={() => setShowUpdateBookSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteBookDialog(true)}
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

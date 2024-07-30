"use client"

import * as React from "react"
import { type Loans } from "@/db/schema"
import { type ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { KembalikanBukuDialog } from "./kembalikan-buku-dialog"
import { PreviewBooksDialog } from "./preview-book-dialog"

export function getColumns(): ColumnDef<Loans>[] {
  const columns = [
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
      accessorKey: "borrow",
      header: () => <span>Aksi</span>,
      cell: ({ row }) => {
        const [showKembalikanBukuDialog, setShowKembalikanBukuDialog] =
          React.useState(false)
        return (
          <div className="flex items-center">
            <KembalikanBukuDialog
              open={showKembalikanBukuDialog}
              onOpenChange={setShowKembalikanBukuDialog}
              loans={row.original}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <Button onClick={() => setShowKembalikanBukuDialog(true)}>
              Kembalikan
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: "preview",
      header: () => <span>Preview</span>,
      cell: ({ row }) => {
        const [previewBookDialog, setPreviewBookDialog] = React.useState(false)
        return (
          <PreviewBooksDialog
            open={previewBookDialog}
            onOpenChange={setPreviewBookDialog}
            book={row.original}
          />
        )
      },
    },
  ]
  return columns
}

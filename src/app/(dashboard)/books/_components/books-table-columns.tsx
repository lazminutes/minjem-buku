"use client"

import * as React from "react"
import { type Book } from "@/db/schema"
import { type ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { PinjamBukuDialog } from "@/app/(dashboard)/books/_components/pinjam-buku-dialog"
import { PreviewBooksDialog } from "@/app/(dashboard)/books/_components/preview-book-dialog"

export function getColumns(): ColumnDef<Book>[] {
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
        const [showPinjamBukuDialog, setshowPinjamBukuDialog] =
          React.useState(false)
        return (
          <div className="flex items-center">
            <PinjamBukuDialog
              open={showPinjamBukuDialog}
              onOpenChange={setshowPinjamBukuDialog}
              book={row.original}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            {row.getValue("quantity") ? (
              <Button onClick={() => setshowPinjamBukuDialog(true)}>
                Pinjam Buku
              </Button>
            ) : (
              <span className="truncate font-medium">Kosong</span>
            )}
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

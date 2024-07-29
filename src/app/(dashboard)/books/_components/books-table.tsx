"use client"
"use memo"

import * as React from "react"
import { type Book } from "@/db/schema"
import { type DataTableFilterField } from "@/types"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { getBooks } from "@/lib/queries/books"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table/data-table"
import { DeleteBooksDialog } from "@/app/(dashboard)/books/_components/delete-books-dialog"
import { UpdateBookSheet } from "@/app/(dashboard)/books/_components/update-book-sheet"

import { getColumns } from "./books-table-columns"
import { BooksTableToolbarActions } from "./books-table-toolbar-actions"

interface BooksTableProps {
  session?: any
  booksPromise: ReturnType<typeof getBooks>
}

export function BooksTable({ booksPromise, session }: BooksTableProps) {
  const { data, pageCount }: any = React.use(booksPromise)

  const columns = getColumns()
  if (session?.user && session?.user?.role == "superadmin") {
    columns.push({
      id: "actions",
      cell: function Cell({ row }) {
        const [showUpdateBookSheet, setShowUpdateBookSheet] =
          React.useState(false)
        const [showDeleteBookDialog, setShowDeleteBookDialog] =
          React.useState(false)

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
    })
  }

  const filterFields: DataTableFilterField<Book>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    defaultPerPage: 10,
    defaultSort: "createdAt.desc",
  })

  return (
    <DataTable table={table}>
      {session?.user && session?.user?.role == "superadmin" ? (
        <BooksTableToolbarActions />
      ) : null}
    </DataTable>
  )
}

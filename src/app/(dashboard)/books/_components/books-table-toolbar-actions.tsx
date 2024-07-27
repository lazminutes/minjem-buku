"use client"

import { type Book } from "@/db/schema"
import { type Table } from "@tanstack/react-table"

import { CreateBookDialog } from "./create-book-dialog"

interface BooksTableToolbarActionsProps {
  table: Table<Book>
}

export function BooksTableToolbarActions({
  table,
}: BooksTableToolbarActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <CreateBookDialog />
    </div>
  )
}

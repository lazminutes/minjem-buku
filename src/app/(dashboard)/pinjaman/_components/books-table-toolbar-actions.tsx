"use client"

import { CreateBookDialog } from "./create-book-dialog"

export function BooksTableToolbarActions() {
  return (
    <div className="flex items-center justify-end">
      <CreateBookDialog />
    </div>
  )
}

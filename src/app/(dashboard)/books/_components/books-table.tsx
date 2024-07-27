"use client"
"use memo"

import * as React from "react"
import { type Book } from "@/db/schema"
import { type DataTableFilterField } from "@/types"

import { getBooks } from "@/lib/queries/books"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"

import { getColumns } from "./books-table-columns"
import { BooksTableToolbarActions } from "./books-table-toolbar-actions"

interface BooksTableProps {
  booksPromise: ReturnType<typeof getBooks>
}

export function BooksTable({ booksPromise }: BooksTableProps) {
  const { data, pageCount }: any = React.use(booksPromise)

  const columns = React.useMemo(() => getColumns(), [])

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
      <BooksTableToolbarActions table={table} />
    </DataTable>
  )
}

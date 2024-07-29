"use memo"

import * as React from "react"
import { auth } from "@/auth"

import { getBooks } from "@/lib/queries/books"
import { searchParamsSchema } from "@/lib/validations/search-params-schema"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Shell } from "@/components/shell"

import { BooksTable } from "./_components/books-table"

export default async function BooksPage({ searchParams }: any) {
  const search = searchParamsSchema.parse(searchParams)

  const session = await auth()
  const booksPromise = getBooks(search)
  return (
    <Shell className="gap-2">
      <h2 className="text-2xl font-bold tracking-tight">Books</h2>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <BooksTable booksPromise={booksPromise} session={session} />
      </React.Suspense>
    </Shell>
  )
}

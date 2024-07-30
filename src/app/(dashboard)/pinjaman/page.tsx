"use memo"

import * as React from "react"
import { auth } from "@/auth"

import { getPinjaman } from "@/lib/queries/pinjam"
import { searchParamsSchema } from "@/lib/validations/search-params-schema"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Shell } from "@/components/shell"

import { LoansTable } from "./_components/books-table"

export default async function PinjamanPage({ searchParams }: any) {
  const session = await auth()
  const search = searchParamsSchema.parse(searchParams)

  const loansPromise = getPinjaman(search, session?.user)
  return (
    <Shell className="gap-2">
      <h2 className="text-2xl font-bold tracking-tight">Pinjaman</h2>
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
        <LoansTable loansPromise={loansPromise} />
      </React.Suspense>
    </Shell>
  )
}

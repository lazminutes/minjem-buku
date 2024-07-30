"use client"
"use memo"

import * as React from "react"
import { type Loans } from "@/db/schema"
import { type DataTableFilterField } from "@/types"

import { getPinjaman } from "@/lib/queries/pinjam"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"

import { getColumns } from "./books-table-columns"

interface LoansTableProps {
  loansPromise: ReturnType<typeof getPinjaman>
}

export function LoansTable({ loansPromise }: LoansTableProps) {
  const { data, pageCount }: any = React.use(loansPromise)

  const columns = getColumns()

  const filterFields: DataTableFilterField<Loans>[] = [
    {
      label: "Title",
      value: "bookId",
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

  return <DataTable table={table}></DataTable>
}

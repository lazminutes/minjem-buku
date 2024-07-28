"use client"
"use memo"

import * as React from "react"
import { type User } from "@/db/schema"
import { type DataTableFilterField } from "@/types"

import { getUsers } from "@/lib/queries/users"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"

import { getColumns } from "./user-table-columns"
import { UsersTableToolbarActions } from "./user-table-toolbar-actions"

interface UsersTableProps {
  usersPromise: ReturnType<typeof getUsers>
}

export function UsersTable({ usersPromise }: UsersTableProps) {
  const { data, pageCount }: any = React.use(usersPromise)

  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<User>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter names...",
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
      <UsersTableToolbarActions />
    </DataTable>
  )
}

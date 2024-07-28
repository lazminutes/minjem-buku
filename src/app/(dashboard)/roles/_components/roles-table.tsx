"use client"
"use memo"

import * as React from "react"
import { type Role } from "@/db/schema"
import { type DataTableFilterField } from "@/types"

import { getRoles } from "@/lib/queries/roles"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"

import { getColumns } from "./role-table-columns"
import { RolesTableToolbarActions } from "./roles-table-toolbar-actions"

interface RolesTableProps {
  rolesPromise: ReturnType<typeof getRoles>
}

export function RolesTable({ rolesPromise: rolesPromise }: RolesTableProps) {
  const { data, pageCount }: any = React.use(rolesPromise)

  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<Role>[] = [
    {
      label: "Role",
      value: "name",
      placeholder: "Filter roles...",
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
      <RolesTableToolbarActions />
    </DataTable>
  )
}

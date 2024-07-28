"use memo"

import * as React from "react"

import { getRoles } from "@/lib/queries/roles"
import { searchParamsSchema } from "@/lib/validations/search-params-schema"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Shell } from "@/components/shell"

import { RolesTable } from "./_components/roles-table"

export default async function RolesPage({ searchParams }: any) {
  const search = searchParamsSchema.parse(searchParams)

  const rolesPromise = getRoles(search)
  return (
    <Shell className="gap-2">
      <h2 className="text-2xl font-bold tracking-tight">Roles</h2>
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
        <RolesTable rolesPromise={rolesPromise} />
      </React.Suspense>
    </Shell>
  )
}

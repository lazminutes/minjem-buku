"use memo"

import * as React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

import { getUsers } from "@/lib/queries/users"
import { searchParamsSchema } from "@/lib/validations/search-params-schema"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Shell } from "@/components/shell"

import { UsersTable } from "./_components/users-table"

export default async function UsersPage({ searchParams }: any) {
  const session = await auth()
  if (session?.user?.role != "superadmin") {
    redirect("/")
  }
  const search = searchParamsSchema.parse(searchParams)
  const usersPromise = getUsers(search)
  return (
    <Shell className="gap-2">
      <h2 className="text-2xl font-bold tracking-tight">Users</h2>
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
        <UsersTable usersPromise={usersPromise} />
      </React.Suspense>
    </Shell>
  )
}

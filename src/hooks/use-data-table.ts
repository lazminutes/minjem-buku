"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { DataTableFilterField } from "@/types"
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { z } from "zod"

import { useDebounce } from "@/hooks/use-debounce"

interface UseDataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  pageCount: number
  defaultPerPage?: number
  defaultSort?: `${Extract<keyof TData, string | number>}.${"asc" | "desc"}`
  filterFields?: DataTableFilterField<TData>[]
  enableAdvancedFilter?: boolean
}

const schema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional(),
})

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  defaultPerPage = 10,
  defaultSort,
  filterFields = [],
  enableAdvancedFilter = false,
}: UseDataTableProps<TData, TValue>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = schema.parse(Object.fromEntries(searchParams))
  const page = search.page
  const perPage = search.per_page ?? defaultPerPage
  const sort = search.sort ?? defaultSort
  const [column, order] = sort?.split(".") ?? []

  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    }
  }, [filterFields])

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const filterableColumn = filterableColumns.find(
          (column) => column.value === key
        )
        const searchableColumn = searchableColumns.find(
          (column) => column.value === key
        )

        if (filterableColumn) {
          filters.push({
            id: key,
            value: value.split("."),
          })
        } else if (searchableColumn) {
          filters.push({
            id: key,
            value: [value],
          })
        }

        return filters
      },
      []
    )
  }, [filterableColumns, searchableColumns, searchParams])

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters)

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: page - 1,
      pageSize: perPage,
    })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: column ?? "",
      desc: order === "desc",
    },
  ])

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
        sort: sorting[0]?.id
          ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
          : null,
      })}`,
      {
        scroll: false,
      }
    )
  }, [pageIndex, pageSize, sorting])

  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter: any) => {
          return searchableColumns.find((column) => column.value === filter.id)
        })
      ),
      500
    )
  ) as ColumnFiltersState

  const filterableColumnFilters = columnFilters.filter((filter: any) => {
    return filterableColumns.find((column) => column.value === filter.id)
  })

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (enableAdvancedFilter) return

    if (!mounted) {
      setMounted(true)
      return
    }

    const newParamsObject = {
      page: 1,
    }

    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === "string") {
        Object.assign(newParamsObject, {
          [column.id]: typeof column.value === "string" ? column.value : null,
        })
      }
    }

    for (const column of filterableColumnFilters) {
      if (typeof column.value === "object" && Array.isArray(column.value)) {
        Object.assign(newParamsObject, { [column.id]: column.value.join(".") })
      }
    }

    for (const key of searchParams.keys()) {
      if (
        (searchableColumns.find((column) => column.value === key) &&
          !debouncedSearchableColumnFilters.find(
            (column: any) => column.id === key
          )) ||
        (filterableColumns.find((column) => column.value === key) &&
          !filterableColumnFilters.find((column: any) => column.id === key))
      ) {
        Object.assign(newParamsObject, { [key]: null })
      }
    }

    router.push(`${pathname}?${createQueryString(newParamsObject)}`)

    table.setPageIndex(0)
  }, [
    JSON.stringify(debouncedSearchableColumnFilters),
    JSON.stringify(filterableColumnFilters),
  ])

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  return { table }
}

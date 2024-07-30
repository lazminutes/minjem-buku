import type { Metadata } from "next"
import { env } from "@/env.js"

import { getTotalBooksCount } from "@/lib/actions/books"

import { OverviewCard } from "./_components/overview-card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Dashboard untuk perpustakaan",
}

export default async function DashboardPage() {
  const totalBooks = await getTotalBooksCount()
  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Books"
          value={String(totalBooks)}
          description="Total Buku yang Ada di Perpustakaan"
          icon="reader"
        />
      </div>
    </div>
  )
}

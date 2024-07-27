import { env } from "@/env.js"
import type { Metadata } from "next"

import { OverviewCard } from "./_components/overview-card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Dashboard untuk perpustakaan",
}

export default async function DashboardPage() {

  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Revenue"
          value={"1"}
          description="Total revenue for your store"
          icon="dollarSign"
        />
        <OverviewCard
          title="Sales"
          value={"1"}
          description="Total sales for your store"
          icon="credit"
        />
        <OverviewCard
          title="Orders"
          value={"1"}
          description="Total orders for your store"
          icon="cart"
        />
        <OverviewCard
          title="Customers"
          value={"1"}
          description="Total customers for your store"
          icon="activity"
        />
      </div>
    </div>
  )
}

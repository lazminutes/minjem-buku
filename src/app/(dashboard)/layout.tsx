import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { SidebarProvider } from "../../components/layouts/sidebar-provider"
import { DashboardHeader } from "./_components/dashboard-header"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { DashboardSidebarSheet } from "./_components/dashboard-sidebar-sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
        <DashboardSidebar className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block">
          <React.Suspense
            fallback={<Skeleton className="h-10 w-full" />}
          ></React.Suspense>
        </DashboardSidebar>
        <div className="flex flex-col">
          <DashboardHeader>
            <DashboardSidebarSheet className="lg:hidden">
              <DashboardSidebar>
                <React.Suspense
                  fallback={<Skeleton className="h-10 w-full" />}
                ></React.Suspense>
              </DashboardSidebar>
            </DashboardSidebarSheet>
          </DashboardHeader>
          <main className="flex-1 overflow-hidden px-6 pt-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

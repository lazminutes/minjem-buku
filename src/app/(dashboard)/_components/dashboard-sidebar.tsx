"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"
import { SidebarNav } from "@/components/layouts/sidebar-nav"

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function DashboardSidebar({
  children,
  className,
  ...props
}: DashboardSidebarProps) {
  const user = useUser()
  const segments = useSelectedLayoutSegments()

  let sidebarNav
  if (!user) {
    sidebarNav = [
      {
        title: "Dashboard",
        href: `/`,
        icon: "dashboard",
        active: segments.length === 0,
      },
      {
        title: "Books",
        href: `/books`,
        icon: "reader",
        active: segments.includes("books"),
      },
    ]
  } else if (user?.role === "siswa") {
    sidebarNav = [
      {
        title: "Dashboard",
        href: `/`,
        icon: "dashboard",
        active: segments.length === 0,
      },
      {
        title: "Books",
        href: `/books`,
        icon: "reader",
        active: segments.includes("books"),
      },
      {
        title: "Pinjaman",
        href: `/pinjaman`,
        icon: "bookmark",
        active: segments.includes("pinjaman"),
      },
    ]
  } else {
    sidebarNav = [
      {
        title: "Dashboard",
        href: `/`,
        icon: "dashboard",
        active: segments.length === 0,
      },
      {
        title: "Books",
        href: `/books`,
        icon: "reader",
        active: segments.includes("books"),
      },
      {
        title: "Pinjaman",
        href: `/pinjaman`,
        icon: "bookmark",
        active: segments.includes("pinjaman"),
      },
      {
        title: "Users",
        href: `/users`,
        icon: "avatar",
        active: segments.includes("users"),
      },
    ]
  }

  return (
    <aside className={cn("h-screen w-full", className)} {...props}>
      <div className="hidden h-[3.55rem] items-center border-b border-border/60 px-4 lg:flex lg:px-6">
        <Link
          href="/"
          className="flex w-fit items-center font-heading tracking-wider text-foreground/90 transition-colors hover:text-foreground"
        >
          <Icons.reader className="mb-1 mr-2 size-7" aria-hidden="true" />
          Minjem Buku
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 px-4 pt-2 lg:px-6 lg:pt-4">
        {children}
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
        <SidebarNav items={sidebarNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  )
}

import type { Metadata } from "next"
import { env } from "@/env.js"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { LogOutButton } from "../_components/logout-button"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign out",
  description: "Sign out of your account",
}

export default function SignOutPage() {
  return (
    <Shell className="max-w-md">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Logout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Anda yakin ingin logout?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButton />
    </Shell>
  )
}

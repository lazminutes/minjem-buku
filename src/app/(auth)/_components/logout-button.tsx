"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function LogOutButton() {
  const router = useRouter()
  const mounted = useMounted()

  return (
    <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
      >
        Kembali
        <span className="sr-only">Halaman Sebelumnya</span>
      </Button>
      {mounted ? (
        <Button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          size="sm"
          className="w-full"
        >
          Log out
          <span className="sr-only">Logout</span>
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground"
          )}
        >
          Log out
        </Skeleton>
      )}
    </div>
  )
}

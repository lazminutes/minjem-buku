"use client"

import * as React from "react"
import Link from "next/link"
import { Loans } from "@/db/schema"
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { kembalikan } from "@/lib/actions/return"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface KembalikanBukuDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  loans: Loans
  showTrigger?: boolean
  onSuccess?: () => void
}

export function KembalikanBukuDialog({
  loans,
  showTrigger = true,
  onSuccess,
  ...props
}: KembalikanBukuDialogProps) {
  const [isPinjamPending, startPinjamTransition] = React.useTransition()
  const isDesktop = useMediaQuery("(min-width: 640px)")
  const user = useUser()

  function onPinjam() {
    startPinjamTransition(async () => {
      const { error } = await kembalikan({
        id: loans.id,
        bookId: loans.bookId,
      })

      if (error) {
        toast.error(error)
        return
      }

      props.onOpenChange?.(false)
      toast.success("Selamat membaca!")
      onSuccess?.()
    })
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anda yakin ingin meminjam buku ini?</DialogTitle>
            <DialogDescription>
              Terima kasih telah mengembalikan buku ini.
              {/* {JSON.stringify(book)} */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {user ? (
              <Button
                aria-label="Pinjam buku"
                onClick={onPinjam}
                disabled={isPinjamPending}
              >
                {isPinjamPending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Kembalikan
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">
                  Login untuk pinjam
                  <span className="sr-only">Login untuk pinjam</span>
                </Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Anda yakin ingin meminjam buku ini?</DrawerTitle>
          <DrawerDescription>
            Waktu pengembalian adalah 30 hari dan dikenakan denda apabila
            melebihi waktu
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          {user ? (
            <Button
              aria-label="Pinjam buku"
              onClick={onPinjam}
              disabled={isPinjamPending}
            >
              {isPinjamPending && (
                <ReloadIcon
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Pinjam
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">
                Login untuk pinjam
                <span className="sr-only">Login untuk pinjam</span>
              </Link>
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

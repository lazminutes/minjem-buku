"use client"

import * as React from "react"
import { type Book } from "@/db/schema"
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { deleteBook } from "@/lib/actions/books"
import { useMediaQuery } from "@/hooks/use-media-query"
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

interface PinjamBukuDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  book: Book
  showTrigger?: boolean
  onSuccess?: () => void
}

export function PinjamBukuDialog({
  book,
  showTrigger = true,
  onSuccess,
  ...props
}: PinjamBukuDialogProps) {
  const [isPinjamPending, startPinjamTransition] = React.useTransition()
  const isDesktop = useMediaQuery("(min-width: 640px)")

  function onPinjam() {
    startPinjamTransition(async () => {
      const { error } = await deleteBook({
        id: book.id,
      })

      if (error) {
        toast.error(error)
        return
      }

      props.onOpenChange?.(false)
      toast.success("Buku berhasil dihapus")
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
              Waktu pengembalian adalah 30 hari dan dikenakan denda apabila
              melebihi waktu
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

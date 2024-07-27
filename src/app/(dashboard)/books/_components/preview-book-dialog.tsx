"use client"

import * as React from "react"
import Image from "next/image"
import { type Book } from "@/db/schema"
import { EyeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface PreviewBookDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  book: Book
}

export function PreviewBooksDialog({ book, ...props }: PreviewBookDialogProps) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EyeOpenIcon className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          {book.image ? (
            <Image src={book.image} alt={book.title} width={300} height={400} />
          ) : (
            <span>Gambar tidak tersedia</span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

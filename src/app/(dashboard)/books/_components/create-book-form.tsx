"use client"

import * as React from "react"

import { useUploadFile } from "@/hooks/use-upload-file"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-upload"
import { UploadedFilesCard } from "@/components/uploaded-files-card"

interface CreateBookFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode
  form: any
  onSubmit: (data: any) => void
}

export function CreateBookForm({
  form,
  onSubmit,
  children,
}: CreateBookFormProps) {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Negeri Para Bedebah"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penulis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Terel Liye"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Buku yang Tersedia</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFileCount={4}
                    maxSize={4 * 1024 * 1024}
                    progresses={progresses}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              {uploadedFiles.length > 0 ? (
                <UploadedFilesCard uploadedFiles={uploadedFiles} />
              ) : null}
            </div>
          )}
        />
        {children}
      </form>
    </Form>
  )
}

import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

// const session = auth()
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {}
  ),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

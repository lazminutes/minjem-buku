"use client"

import * as React from "react"

import { ErrorCard } from "@/components/error-card"

export default function UpdateStoreError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorCard
      title={error.name}
      description={error.message}
      reset={reset}
      className="mx-auto max-w-md pt-20"
    />
  )
}

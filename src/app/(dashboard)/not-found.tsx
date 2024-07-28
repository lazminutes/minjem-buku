import { ErrorCard } from "@/components/error-card"
import { Shell } from "@/components/shell"

export default function NotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Not found"
        description="Nothing to see here.."
        retryLink="/dashboard/books"
        retryLinkText="Go to Books"
      />
    </Shell>
  )
}

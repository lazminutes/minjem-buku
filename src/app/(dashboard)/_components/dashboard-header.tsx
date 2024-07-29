import { AuthDropdown } from "@/components/layouts/auth-dropdown"
import { ModeToggle } from "@/components/layouts/mode-toggle"

interface DashboardHeaderProps {
  children: React.ReactNode
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        {children}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <ModeToggle />
            <AuthDropdown />
          </nav>
        </div>
      </div>
    </header>
  )
}

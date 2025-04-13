import type React from "react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { GlobalSearch } from "@/components/global-search"
import { AlertsButton } from "@/components/alerts/alerts-button"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg hidden sm:inline-block">AlternativeData</span>
        </div>

        <div className="flex-1 mx-4">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-3">
          <AlertsButton />
          <ModeToggle />
          <UserNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className={cn("mx-auto max-w-7xl p-4 pt-6 sm:p-6 sm:pt-8", className)}>{children}</div>
      </main>
    </div>
  )
}

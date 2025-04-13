"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { ActiveSignals } from "@/components/dashboard/active-signals"
import { useStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"

export default function SignalsPage() {
  const { selectedTicker } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedTicker])

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-4">
        <DashboardHeader
          heading="Signal Sources"
          text={`Alternative data signals that preceded price movements for ${selectedTicker || "all stocks"}`}
        />

        {isLoading ? <Skeleton className="w-full h-[600px] rounded-lg" /> : <ActiveSignals />}
      </div>
    </DashboardShell>
  )
}

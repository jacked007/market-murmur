"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { MarketTrends } from "@/components/dashboard/market-trends"
import { useStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"

export default function TrendsPage() {
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
          heading="Market Trends"
          text={`Sector performance and market trend analysis related to ${selectedTicker || "all sectors"}`}
        />

        {isLoading ? <Skeleton className="w-full h-[600px] rounded-lg" /> : <MarketTrends />}
      </div>
    </DashboardShell>
  )
}

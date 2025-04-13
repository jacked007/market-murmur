"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { AppTrafficInsights } from "@/components/dashboard/app-traffic-insights"
import { useStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"

export default function AppTrafficPage() {
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
          heading="App Traffic"
          text={`App download and website traffic metrics for ${selectedTicker || "all companies"}`}
        />

        {isLoading ? <Skeleton className="w-full h-[600px] rounded-lg" /> : <AppTrafficInsights className="w-full" />}
      </div>
    </DashboardShell>
  )
}

"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { SatelliteTraffic } from "@/components/dashboard/satellite-traffic"
import { useStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"

export default function SatellitePage() {
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
          heading="Satellite Data"
          text={`Recent satellite imagery and foot traffic data for ${selectedTicker || "all locations"}`}
        />

        {isLoading ? <Skeleton className="w-full h-[600px] rounded-lg" /> : <SatelliteTraffic className="w-full" />}
      </div>
    </DashboardShell>
  )
}

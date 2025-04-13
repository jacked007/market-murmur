"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TopMovers } from "@/components/dashboard/top-movers"
import { AISummary } from "@/components/dashboard/ai-summary"
import { TrendingSentiment } from "@/components/dashboard/trending-sentiment"
import { ActiveSignals } from "@/components/dashboard/active-signals"
import { MiniNewsPanel } from "@/components/dashboard/mini-news-panel"
import { StockQuote } from "@/components/dashboard/stock-quote"
import { useStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Globe, LineChart, Newspaper, Satellite, Settings, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { selectedTicker } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isDataSeeded, setIsDataSeeded] = useState(false)

  // Check if data is seeded
  useEffect(() => {
    const checkData = async () => {
      try {
        const supabase = createClientSupabaseClient()
        const { count, error } = await supabase.from("stocks").select("*", { count: "exact", head: true })

        if (error) {
          console.error("Error checking stocks:", error)
          return
        }

        if (count === 0) {
          // Seed the database
          await fetch("/api/seed")
          setIsDataSeeded(true)
        } else {
          setIsDataSeeded(true)
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    checkData()
  }, [])

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedTicker])

  const navigationItems = [
    { name: "Sentiment", href: "/sentiment", icon: BarChart3 },
    { name: "Satellite", href: "/satellite", icon: Satellite },
    { name: "Jobs", href: "/jobs", icon: Users },
    { name: "Shipping", href: "/shipping", icon: Globe },
    { name: "App Traffic", href: "/app-traffic", icon: LineChart },
    { name: "Earnings", href: "/earnings", icon: FileText },
    { name: "Signals", href: "/signals", icon: TrendingUp },
    { name: "Trends", href: "/trends", icon: TrendingUp },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-4">
        <DashboardHeader
          heading="Investment Dashboard"
          text={`Alternative data insights for ${selectedTicker || "all stocks"}`}
        />

        {/* Navigation Cards - Previously in Sidebar */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Navigation</CardTitle>
            <CardDescription>Access all dashboard features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="outline"
                  className="h-auto flex-col py-4 justify-start items-center gap-2 text-center"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 grid-cols-1">
          {isLoading || !isDataSeeded ? (
            <>
              <Skeleton className="w-full h-[200px] rounded-lg" />
              <Skeleton className="w-full h-[300px] rounded-lg" />
              <Skeleton className="w-full h-[200px] rounded-lg" />
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="w-full h-[300px] rounded-lg" />
                <Skeleton className="w-full h-[300px] rounded-lg" />
              </div>
              <Skeleton className="w-full h-[400px] rounded-lg" />
            </>
          ) : (
            <>
              {selectedTicker && <StockQuote />}
              <TopMovers />
              <AISummary />

              <div className="grid gap-4 md:grid-cols-2">
                <TrendingSentiment />
                <MiniNewsPanel />
              </div>

              <ActiveSignals />
            </>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}

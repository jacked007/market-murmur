"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Calendar, Globe, Package, Smartphone, TrendingUp, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "@/lib/store"
import { createClientSupabaseClient } from "@/lib/supabase"

interface Signal {
  id: number
  type: string
  icon: any
  description: string
  date: string
  stock: string
  impact: "Positive" | "Negative" | "Neutral"
  strength: "High" | "Medium" | "Low"
  lead_time: string
}

// Map signal types to icons
const iconMap = {
  Satellite: Globe,
  "Social Media": BarChart3,
  "Job Postings": Users,
  Shipping: Package,
  "App Traffic": Smartphone,
  "Earnings Call": TrendingUp,
}

export function ActiveSignals() {
  const { selectedTicker } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [signals, setSignals] = useState<Signal[]>([])

  useEffect(() => {
    const fetchSignals = async () => {
      setIsLoading(true)

      try {
        const supabase = createClientSupabaseClient()

        let query = supabase.from("signals").select("*").order("date", { ascending: false })

        if (selectedTicker) {
          query = query.eq("ticker", selectedTicker)
        }

        const { data, error } = await query

        if (error) {
          console.error("Error fetching signals:", error)
          throw error
        }

        if (data) {
          // Transform the data to match our component's expected format
          const formattedSignals = data.map((signal) => ({
            id: signal.id,
            type: signal.type,
            icon: iconMap[signal.type as keyof typeof iconMap] || Zap,
            description: signal.description,
            date: new Date(signal.date).toISOString().split("T")[0],
            stock: signal.ticker,
            impact: signal.impact as "Positive" | "Negative" | "Neutral",
            strength: signal.strength as "High" | "Medium" | "Low",
            lead_time: signal.lead_time,
          }))

          setSignals(formattedSignals)
        }
      } catch (error) {
        console.error("Error:", error)

        // Fallback to mock data if there's an error
        const mockData: Signal[] = [
          {
            id: 1,
            type: "Satellite",
            icon: Globe,
            description: "Increased activity at Tesla Gigafactory",
            date: "2023-12-01",
            stock: "TSLA",
            impact: "Positive",
            strength: "High",
            lead_time: "3 days before 5.2% price increase",
          },
          {
            id: 2,
            type: "Social Media",
            icon: BarChart3,
            description: "Negative sentiment spike on product quality",
            date: "2023-12-03",
            stock: "AAPL",
            impact: "Negative",
            strength: "Medium",
            lead_time: "24 hours before 2.1% price drop",
          },
        ]

        // Filter by selected ticker if one is selected
        const filteredData = selectedTicker ? mockData.filter((item) => item.stock === selectedTicker) : mockData
        setSignals(filteredData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSignals()
  }, [selectedTicker])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Signal Sources</CardTitle>
            <CardDescription>Alternative data signals that preceded price movements</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : signals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No signals found for the selected stock</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Signal Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead className="hidden md:table-cell">Lead Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((signal) => (
                <TableRow key={signal.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <signal.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{signal.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{signal.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{signal.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-semibold">
                      {signal.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        signal.impact === "Positive"
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
                      )}
                    >
                      {signal.impact} ({signal.strength})
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm">{signal.lead_time}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

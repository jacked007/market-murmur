"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface QuoteData {
  c: number // Current price
  d: number // Change
  dp: number // Percent change
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
}

export function StockQuote() {
  const { selectedTicker } = useStore()
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedTicker) return

    const fetchQuote = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/stock/${selectedTicker}/quote`)

        if (!response.ok) {
          throw new Error(`Failed to fetch quote: ${response.statusText}`)
        }

        const data = await response.json()
        setQuoteData(data)
      } catch (err) {
        console.error("Error fetching stock quote:", err)
        setError("Failed to fetch stock quote. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuote()
  }, [selectedTicker])

  if (!selectedTicker) return null

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-48 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{selectedTicker}</CardTitle>
          <CardDescription>Stock Quote</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-16 text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  if (!quoteData) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{selectedTicker}</CardTitle>
          <CardDescription>Stock Quote</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-16 text-muted-foreground">
            No data available for this stock.
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPositive = quoteData.d >= 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{selectedTicker}</CardTitle>
        <CardDescription>Real-time Stock Quote</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Price</p>
            <p className="text-3xl font-bold">${quoteData.c.toFixed(2)}</p>
            <div className={`flex items-center mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="font-medium">
                ${Math.abs(quoteData.d).toFixed(2)} ({Math.abs(quoteData.dp).toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Open</p>
              <p className="text-sm font-medium">${quoteData.o.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Prev Close</p>
              <p className="text-sm font-medium">${quoteData.pc.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">High</p>
              <p className="text-sm font-medium">${quoteData.h.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Low</p>
              <p className="text-sm font-medium">${quoteData.l.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

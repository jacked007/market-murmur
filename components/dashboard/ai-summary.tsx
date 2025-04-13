"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"

export function AISummary() {
  const { selectedTicker } = useStore()
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasNews, setHasNews] = useState(true)

  useEffect(() => {
    if (!selectedTicker) return

    const fetchSummary = async () => {
      setIsLoading(true)
      setError(null)
      setHasNews(true)

      try {
        // First check if there's news for this stock
        const newsResponse = await fetch(`/api/stock/${selectedTicker}/news`)

        if (!newsResponse.ok) {
          throw new Error(`Failed to fetch news: ${newsResponse.statusText}`)
        }

        const newsData = await newsResponse.json()

        if (!Array.isArray(newsData) || newsData.length === 0) {
          setHasNews(false)
          setIsLoading(false)
          return
        }

        // If we have news, fetch the AI summary
        const summaryResponse = await fetch(`/api/summary/${selectedTicker}`)

        if (!summaryResponse.ok) {
          throw new Error(`Failed to fetch summary: ${summaryResponse.statusText}`)
        }

        const summaryData = await summaryResponse.json()
        setSummary(summaryData.summary)
      } catch (err) {
        console.error("Error fetching AI summary:", err)
        setError("Failed to generate AI summary. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [selectedTicker])

  if (!selectedTicker) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>AI Summary</CardTitle>
          <CardDescription>Select a stock to see an AI-generated summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <AlertCircle className="h-5 w-5 mr-2" />
            No stock selected
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>AI Summary</CardTitle>
          <CardDescription>Analyzing recent news and data for {selectedTicker}</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    )
  }

  if (!hasNews) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>AI Summary</CardTitle>
          <CardDescription>Recent news analysis for {selectedTicker}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <AlertCircle className="h-5 w-5 mr-2" />
            No news regarding this stock.
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>AI Summary</CardTitle>
          <CardDescription>Recent news analysis for {selectedTicker}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>AI Summary</CardTitle>
        <CardDescription>Recent news analysis for {selectedTicker}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{summary}</p>
      </CardContent>
    </Card>
  )
}

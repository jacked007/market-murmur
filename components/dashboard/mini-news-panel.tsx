"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface NewsItem {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

export function MiniNewsPanel() {
  const { selectedTicker } = useStore()
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      setError(null)

      try {
        let endpoint = "/api/news"

        if (selectedTicker) {
          endpoint = `/api/stock/${selectedTicker}/news`
        }

        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`)
        }

        const data = await response.json()
        setNews(Array.isArray(data) ? data.slice(0, 5) : [])
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to fetch news. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [selectedTicker])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Latest News</CardTitle>
        <CardDescription>{selectedTicker ? `Recent news for ${selectedTicker}` : "Top financial news"}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32 text-destructive">{error}</div>
        ) : news.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No news regarding this stock.
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="space-y-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline flex items-start"
                >
                  {item.headline}
                  <ExternalLink className="h-3 w-3 ml-1 mt-1 flex-shrink-0" />
                </a>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{new Date(item.datetime * 1000).toLocaleDateString()}</span>
                  {item.category && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs py-0 h-5">
                        {item.category}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

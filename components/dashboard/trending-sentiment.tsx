"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Instagram, MessageCircle, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { createClientSupabaseClient } from "@/lib/supabase"

interface SentimentItem {
  symbol: string
  sentiment: string
  change: string
  platform: string
  icon: any
}

// Map platform names to icons
const platformIcons = {
  reddit: MessageCircle,
  twitter: Twitter,
  instagram: Instagram,
}

export function TrendingSentiment() {
  const { selectedTicker } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [sentimentData, setSentimentData] = useState<SentimentItem[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchSentiment = async () => {
      setIsLoading(true)

      try {
        const supabase = createClientSupabaseClient()

        let query = supabase
          .from("sentiment_data")
          .select("ticker, source, score, change, date")
          .order("date", { ascending: false })

        if (selectedTicker) {
          query = query.eq("ticker", selectedTicker)
        }

        if (activeTab !== "all") {
          query = query.eq("source", activeTab)
        }

        const { data, error } = await query

        if (error) {
          console.error("Error fetching sentiment data:", error)
          throw error
        }

        if (data) {
          // Transform the data to match our component's expected format
          const formattedData = data.map((item) => ({
            symbol: item.ticker,
            sentiment: item.score.toFixed(2),
            change: item.change.toFixed(2),
            platform: item.source,
            icon: platformIcons[item.source as keyof typeof platformIcons] || MessageCircle,
          }))

          setSentimentData(formattedData)
        }
      } catch (error) {
        console.error("Error:", error)

        // Fallback to mock data
        const mockData = [
          { symbol: "AAPL", sentiment: "+0.82", change: "+0.12", platform: "reddit", icon: MessageCircle },
          { symbol: "TSLA", sentiment: "-0.35", change: "-0.28", platform: "twitter", icon: Twitter },
          { symbol: "MSFT", sentiment: "+0.67", change: "+0.05", platform: "instagram", icon: Instagram },
        ]

        // Filter by selected ticker if one is selected
        const filteredData = selectedTicker ? mockData.filter((item) => item.symbol === selectedTicker) : mockData
        setSentimentData(filteredData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSentiment()
  }, [selectedTicker, activeTab])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Trending Sentiment</CardTitle>
        <CardDescription>Social media sentiment by platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="reddit" className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              Reddit
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-1">
              <Twitter className="h-3.5 w-3.5" />
              X/Twitter
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-1">
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : sentimentData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No sentiment data available for {selectedTicker || "any stocks"}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {sentimentData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-bold">
                        {item.symbol}
                      </Badge>
                      <div className="flex items-center">
                        <item.icon className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">{item.platform}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          Number(item.sentiment) > 0
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
                        )}
                      >
                        {item.sentiment}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1",
                          Number(item.change) > 0
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
                        )}
                      >
                        {Number(item.change) > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {Math.abs(Number(item.change)).toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-lg bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Trending Keywords</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">product launch</Badge>
                <Badge variant="secondary">earnings</Badge>
                <Badge variant="secondary">AI integration</Badge>
                <Badge variant="secondary">layoffs</Badge>
                <Badge variant="secondary">market share</Badge>
                <Badge variant="secondary">supply chain</Badge>
                <Badge variant="secondary">regulatory</Badge>
                <Badge variant="secondary">competition</Badge>
              </div>
            </div>
          </TabsContent>

          {/* Platform-specific tabs would follow the same pattern */}
          <TabsContent value="reddit" className="space-y-4">
            {/* Reddit-specific content */}
          </TabsContent>
          <TabsContent value="twitter" className="space-y-4">
            {/* Twitter-specific content */}
          </TabsContent>
          <TabsContent value="instagram" className="space-y-4">
            {/* Instagram-specific content */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

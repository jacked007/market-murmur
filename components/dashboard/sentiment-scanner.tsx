"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Instagram, MessageCircle, TrendingUp } from "lucide-react"

interface SentimentScannerProps {
  className?: string
}

export function SentimentScanner({ className }: SentimentScannerProps) {
  const [platform, setPlatform] = useState("all")

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sentiment Scanner</CardTitle>
            <CardDescription>AI-summarized sentiment from social media</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
              Positive
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setPlatform}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Platforms</TabsTrigger>
            <TabsTrigger value="reddit" className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              Reddit
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-1">
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              TikTok
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="mb-2 font-medium">AI Summary</h4>
              <p className="text-sm text-muted-foreground">
                Retail investors are showing increased optimism about AAPL's upcoming product launch. Sentiment has
                shifted positively following the recent earnings call, with many highlighting the company's strong cash
                position and potential for increased dividends.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Trending Keywords</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">product launch</Badge>
                <Badge variant="secondary">earnings</Badge>
                <Badge variant="secondary">dividends</Badge>
                <Badge variant="secondary">cash position</Badge>
                <Badge variant="secondary">innovation</Badge>
                <Badge variant="secondary">market share</Badge>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Recent Posts</h4>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                          {platform === "reddit" || platform === "all" ? (
                            <MessageCircle className="h-3.5 w-3.5" />
                          ) : platform === "instagram" ? (
                            <Instagram className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingUp className="h-3.5 w-3.5" />
                          )}
                        </Badge>
                        <span className="text-xs font-medium">User{i}23</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        +0.8
                      </Badge>
                    </div>
                    <p className="text-sm">
                      {i === 1
                        ? "Really impressed with the latest earnings. Cash position is strong and they're hinting at increased dividends."
                        : i === 2
                          ? "The upcoming product launch looks promising. Could be a game changer for their market position."
                          : "Their innovation pipeline is solid. Expecting good things in the next quarter."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

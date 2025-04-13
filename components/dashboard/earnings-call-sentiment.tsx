"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EarningsCallSentimentProps {
  className?: string
}

export function EarningsCallSentiment({ className }: EarningsCallSentimentProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Earnings Call Sentiment</CardTitle>
            <CardDescription>AI sentiment analysis from earnings calls</CardDescription>
          </div>
          <Select defaultValue="aapl">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aapl">Apple (AAPL)</SelectItem>
              <SelectItem value="msft">Microsoft (MSFT)</SelectItem>
              <SelectItem value="amzn">Amazon (AMZN)</SelectItem>
              <SelectItem value="googl">Alphabet (GOOGL)</SelectItem>
              <SelectItem value="meta">Meta (META)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <div>
            <h4 className="font-medium">Overall Sentiment</h4>
            <p className="text-sm text-muted-foreground">Q4 2023 Earnings Call</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <span className="text-lg font-bold text-green-700">+0.8</span>
            </div>
            <span className="text-sm font-medium text-green-700">Positive</span>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Key Quotes</h4>
          <div className="space-y-3">
            {[
              {
                quote:
                  "We're seeing unprecedented demand for our new product line, and our supply chain is well-positioned to meet this demand.",
                sentiment: "+0.9",
                speaker: "CEO",
              },
              {
                quote:
                  "Our gross margins have improved by 2 percentage points year-over-year, driven by operational efficiencies.",
                sentiment: "+0.7",
                speaker: "CFO",
              },
              {
                quote: "While we face some headwinds in certain markets, our overall growth trajectory remains strong.",
                sentiment: "+0.4",
                speaker: "CEO",
              },
              {
                quote:
                  "We're cautiously optimistic about the next quarter given the current macroeconomic environment.",
                sentiment: "+0.2",
                speaker: "CFO",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{item.speaker}</Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      Number.parseFloat(item.sentiment) > 0.5
                        ? "bg-green-50 text-green-700"
                        : Number.parseFloat(item.sentiment) > 0
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700",
                    )}
                  >
                    {item.sentiment}
                  </Badge>
                </div>
                <p className="text-sm">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 font-medium">Sentiment Trends</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-background p-2 text-center">
              <div className="text-lg font-bold text-green-700">+0.8</div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div className="rounded-lg bg-background p-2 text-center">
              <div className="text-lg font-bold text-yellow-700">+0.5</div>
              <div className="text-xs text-muted-foreground">Previous</div>
            </div>
            <div className="rounded-lg bg-background p-2 text-center">
              <div className="text-lg font-bold text-green-700">+0.3</div>
              <div className="text-xs text-muted-foreground">Change</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

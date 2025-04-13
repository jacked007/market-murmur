"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data for sparklines
const generateSparklineData = (trend: "up" | "down" | "volatile") => {
  const points = 20
  const data = []
  let value = 100

  for (let i = 0; i < points; i++) {
    if (trend === "up") {
      value += Math.random() * 5
    } else if (trend === "down") {
      value -= Math.random() * 5
    } else {
      value += Math.random() * 10 - 5
    }
    data.push({ value: Math.max(value, 10) })
  }

  return data
}

// Mock data for top movers
const topMovers = {
  daily: {
    gainers: [
      { symbol: "NVDA", name: "NVIDIA Corp", change: "+5.8%", data: generateSparklineData("up") },
      { symbol: "TSLA", name: "Tesla Inc", change: "+4.2%", data: generateSparklineData("up") },
      { symbol: "AMD", name: "Advanced Micro Devices", change: "+3.7%", data: generateSparklineData("up") },
      { symbol: "AAPL", name: "Apple Inc", change: "+2.9%", data: generateSparklineData("up") },
      { symbol: "MSFT", name: "Microsoft Corp", change: "+2.1%", data: generateSparklineData("up") },
    ],
    losers: [
      { symbol: "META", name: "Meta Platforms Inc", change: "-3.5%", data: generateSparklineData("down") },
      { symbol: "NFLX", name: "Netflix Inc", change: "-2.8%", data: generateSparklineData("down") },
      { symbol: "AMZN", name: "Amazon.com Inc", change: "-2.3%", data: generateSparklineData("down") },
      { symbol: "GOOGL", name: "Alphabet Inc", change: "-1.9%", data: generateSparklineData("down") },
      { symbol: "JPM", name: "JPMorgan Chase & Co", change: "-1.5%", data: generateSparklineData("down") },
    ],
  },
  weekly: {
    gainers: [
      { symbol: "AAPL", name: "Apple Inc", change: "+8.7%", data: generateSparklineData("up") },
      { symbol: "MSFT", name: "Microsoft Corp", change: "+7.3%", data: generateSparklineData("up") },
      { symbol: "GOOGL", name: "Alphabet Inc", change: "+6.5%", data: generateSparklineData("up") },
      { symbol: "AMZN", name: "Amazon.com Inc", change: "+5.2%", data: generateSparklineData("up") },
      { symbol: "TSLA", name: "Tesla Inc", change: "+4.8%", data: generateSparklineData("volatile") },
    ],
    losers: [
      { symbol: "NFLX", name: "Netflix Inc", change: "-6.2%", data: generateSparklineData("down") },
      { symbol: "META", name: "Meta Platforms Inc", change: "-5.1%", data: generateSparklineData("down") },
      { symbol: "JPM", name: "JPMorgan Chase & Co", change: "-4.3%", data: generateSparklineData("down") },
      { symbol: "V", name: "Visa Inc", change: "-3.7%", data: generateSparklineData("down") },
      { symbol: "WMT", name: "Walmart Inc", change: "-2.9%", data: generateSparklineData("down") },
    ],
  },
  monthly: {
    gainers: [
      { symbol: "NVDA", name: "NVIDIA Corp", change: "+22.5%", data: generateSparklineData("up") },
      { symbol: "AMD", name: "Advanced Micro Devices", change: "+18.3%", data: generateSparklineData("up") },
      { symbol: "TSLA", name: "Tesla Inc", change: "+15.7%", data: generateSparklineData("volatile") },
      { symbol: "AAPL", name: "Apple Inc", change: "+12.4%", data: generateSparklineData("up") },
      { symbol: "MSFT", name: "Microsoft Corp", change: "+10.8%", data: generateSparklineData("up") },
    ],
    losers: [
      { symbol: "META", name: "Meta Platforms Inc", change: "-14.2%", data: generateSparklineData("down") },
      { symbol: "NFLX", name: "Netflix Inc", change: "-11.7%", data: generateSparklineData("down") },
      { symbol: "AMZN", name: "Amazon.com Inc", change: "-9.5%", data: generateSparklineData("down") },
      { symbol: "GOOGL", name: "Alphabet Inc", change: "-7.8%", data: generateSparklineData("down") },
      { symbol: "JPM", name: "JPMorgan Chase & Co", change: "-6.3%", data: generateSparklineData("down") },
    ],
  },
}

export function TopMovers() {
  const [timeframe, setTimeframe] = useState("daily")
  const [view, setView] = useState("gainers")

  const data = topMovers[timeframe as keyof typeof topMovers]
  const stocks = view === "gainers" ? data.gainers : data.losers

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <CardTitle>Top Movers</CardTitle>
            <CardDescription>Biggest stock price movements</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs defaultValue="daily" onValueChange={setTimeframe} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="gainers" onValueChange={setView} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 w-full sm:w-auto">
                <TabsTrigger value="gainers">Gainers</TabsTrigger>
                <TabsTrigger value="losers">Losers</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex flex-col space-y-2 p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{stock.symbol}</h3>
                  <p className="text-xs text-muted-foreground truncate" title={stock.name}>
                    {stock.name}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1",
                    stock.change.startsWith("+")
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
                  )}
                >
                  {stock.change.startsWith("+") ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {stock.change.replace("+", "").replace("-", "")}
                </Badge>
              </div>
              <div className="h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={stock.change.startsWith("+") ? "#16a34a" : "#dc2626"}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

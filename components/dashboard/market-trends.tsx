"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export function MarketTrends() {
  const [view, setView] = useState("sectors")

  // Mock data for sector performance
  const sectorData = [
    { name: "Technology", value: 8.5 },
    { name: "Healthcare", value: 3.2 },
    { name: "Financials", value: -2.1 },
    { name: "Consumer Discretionary", value: 5.7 },
    { name: "Energy", value: -4.3 },
    { name: "Materials", value: 1.8 },
    { name: "Industrials", value: 2.9 },
    { name: "Utilities", value: -1.5 },
    { name: "Real Estate", value: -3.2 },
    { name: "Communication Services", value: 6.4 },
  ]

  // Mock data for market cap distribution
  const marketCapData = [
    { name: "Large Cap", value: 65 },
    { name: "Mid Cap", value: 25 },
    { name: "Small Cap", value: 10 },
  ]

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
    "#8DD1E1",
    "#A4DE6C",
    "#D0ED57",
  ]

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Sector Performance</CardTitle>
              <CardDescription>Monthly performance by sector</CardDescription>
            </div>
            <Tabs defaultValue="sectors" onValueChange={setView} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 w-full sm:w-auto">
                <TabsTrigger value="sectors">Sectors</TabsTrigger>
                <TabsTrigger value="market-cap">Market Cap</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {view === "sectors" ? (
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sectorData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-5, 10]} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value >= 0 ? "#16a34a" : "#dc2626"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketCapData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {marketCapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Sectors</CardTitle>
          <CardDescription>Sectors with highest monthly returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorData
              .filter((sector) => sector.value > 0)
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{sector.name}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1",
                      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
                    )}
                  >
                    <ArrowUp className="h-3 w-3" />
                    {sector.value.toFixed(1)}%
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Underperforming Sectors</CardTitle>
          <CardDescription>Sectors with lowest monthly returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorData
              .filter((sector) => sector.value < 0)
              .sort((a, b) => a.value - b.value)
              .slice(0, 5)
              .map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{sector.name}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1",
                      "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
                    )}
                  >
                    <ArrowDown className="h-3 w-3" />
                    {Math.abs(sector.value).toFixed(1)}%
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

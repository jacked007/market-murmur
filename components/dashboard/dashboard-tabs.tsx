"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { StockSelector } from "@/components/dashboard/stock-selector"

export function DashboardTabs() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(["AAPL", "MSFT", "GOOGL"])

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>
        <StockSelector selectedStocks={selectedStocks} onStocksChange={setSelectedStocks} />
      </div>
      <TabsContent value="overview" className="space-y-4">
        {/* Overview content is rendered in the main page component */}
      </TabsContent>
      <TabsContent value="stocks" className="space-y-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Details</h2>
          <p>Detailed analysis for selected stocks will appear here.</p>
        </Card>
      </TabsContent>
      <TabsContent value="sectors" className="space-y-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Sector Analysis</h2>
          <p>Sector-level analysis will appear here.</p>
        </Card>
      </TabsContent>
      <TabsContent value="watchlist" className="space-y-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
          <p>Your watchlist items will appear here.</p>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

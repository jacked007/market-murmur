"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Globe } from "lucide-react"

interface AppTrafficInsightsProps {
  className?: string
}

const appData = [
  { month: "Jan", downloads: 1200, traffic: 5000 },
  { month: "Feb", downloads: 1900, traffic: 6000 },
  { month: "Mar", downloads: 2400, traffic: 8000 },
  { month: "Apr", downloads: 2800, traffic: 9000 },
  { month: "May", downloads: 3200, traffic: 10000 },
  { month: "Jun", downloads: 4000, traffic: 11000 },
  { month: "Jul", downloads: 4500, traffic: 12000 },
  { month: "Aug", downloads: 4200, traffic: 11500 },
  { month: "Sep", downloads: 3800, traffic: 10500 },
  { month: "Oct", downloads: 3500, traffic: 9500 },
  { month: "Nov", downloads: 3200, traffic: 9000 },
  { month: "Dec", downloads: 3000, traffic: 8500 },
]

export function AppTrafficInsights({ className }: AppTrafficInsightsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mobile App & Web Traffic</CardTitle>
            <CardDescription>App download and website traffic metrics</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="apps">
          <TabsList className="mb-4">
            <TabsTrigger value="apps" className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              App Downloads
            </TabsTrigger>
            <TabsTrigger value="web" className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              Web Traffic
            </TabsTrigger>
            <TabsTrigger value="trends">Google Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="apps" className="space-y-4">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={appData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="downloads" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { app: "TikTok", change: "+15.2%", downloads: "2.3M" },
                { app: "Instagram", change: "+8.7%", downloads: "1.8M" },
                { app: "Amazon", change: "+5.3%", downloads: "1.2M" },
                { app: "Netflix", change: "-2.1%", downloads: "950K" },
              ].map((app, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{app.app}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        app.change.startsWith("+") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
                      )}
                    >
                      {app.change}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Monthly downloads</span>
                    <span className="text-sm font-semibold">{app.downloads}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web" className="space-y-4">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={appData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="traffic" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { site: "Amazon.com", change: "+12.3%", traffic: "182M" },
                { site: "Netflix.com", change: "+7.5%", traffic: "120M" },
                { site: "Apple.com", change: "+4.2%", traffic: "95M" },
                { site: "Microsoft.com", change: "-1.8%", traffic: "78M" },
              ].map((site, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{site.site}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        site.change.startsWith("+") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
                      )}
                    >
                      {site.change}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Monthly visitors</span>
                    <span className="text-sm font-semibold">{site.traffic}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="relative aspect-[2/1] overflow-hidden rounded-lg border">
              <img
                src="/placeholder.svg?height=250&width=500"
                alt="Google Trends chart"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-md bg-black/70 px-3 py-1.5 text-sm text-white">Google Trends Comparison</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { term: "iPhone 15", change: "+120%", interest: "100" },
                { term: "Tesla Model Y", change: "+45%", interest: "78" },
                { term: "Amazon Prime Day", change: "+210%", interest: "95" },
                { term: "Microsoft AI", change: "+85%", interest: "82" },
              ].map((trend, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <span className="font-medium">{trend.term}</span>
                    <p className="text-xs text-muted-foreground">Search interest: {trend.interest}/100</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {trend.change}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

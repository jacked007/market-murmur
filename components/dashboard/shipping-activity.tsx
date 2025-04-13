"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock } from "lucide-react"

interface ShippingActivityProps {
  className?: string
}

export function ShippingActivity({ className }: ShippingActivityProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Shipping & Marine Activity</CardTitle>
            <CardDescription>Cargo ship routes and port activity</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map">
          <TabsList className="mb-4">
            <TabsTrigger value="map">Global Map</TabsTrigger>
            <TabsTrigger value="ports">Major Ports</TabsTrigger>
            <TabsTrigger value="routes">Key Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <div className="relative aspect-[2/1] overflow-hidden rounded-lg border">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Global shipping map"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-md bg-black/70 px-3 py-1.5 text-sm text-white">
                  Global Shipping Activity Map
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <h4 className="mb-2 text-sm font-medium">Active Vessels</h4>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">4,328</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    +3.2%
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <h4 className="mb-2 text-sm font-medium">Average Transit Time</h4>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">18.5 days</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    +2.1 days
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ports" className="space-y-4">
            <div className="space-y-3">
              {[
                { port: "Shanghai", status: "Congested", delay: "+3.2 days", impact: "High" },
                { port: "Singapore", status: "Normal", delay: "+0.5 days", impact: "Low" },
                { port: "Rotterdam", status: "Delayed", delay: "+1.8 days", impact: "Medium" },
                { port: "Los Angeles", status: "Congested", delay: "+4.5 days", impact: "High" },
              ].map((port, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{port.port}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          port.status === "Congested"
                            ? "bg-red-50 text-red-700"
                            : port.status === "Delayed"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700",
                        )}
                      >
                        {port.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Expected delay: {port.delay}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      port.impact === "High"
                        ? "bg-red-50 text-red-700"
                        : port.impact === "Medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-700",
                    )}
                  >
                    {port.impact} Impact
                  </Badge>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">Port Congestion Alert</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Significant congestion at Shanghai and Los Angeles ports is causing delays for consumer electronics and
                automotive parts. Companies with exposure to these supply chains may experience inventory challenges in
                the coming quarter.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  route: "Asia to North America",
                  status: "Delayed",
                  delay: "+4.2 days",
                  companies: ["AAPL", "MSFT", "AMZN"],
                },
                { route: "Europe to North America", status: "Normal", delay: "+0.8 days", companies: ["BMW", "LVMH"] },
                { route: "Asia to Europe", status: "Delayed", delay: "+2.5 days", companies: ["TSLA", "NKE"] },
              ].map((route, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{route.route}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          route.status === "Delayed" ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700",
                        )}
                      >
                        {route.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{route.delay}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">Affected companies:</span>
                    {route.companies.map((company, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SatelliteTrafficProps {
  className?: string
}

export function SatelliteTraffic({ className }: SatelliteTrafficProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Satellite & Foot Traffic</CardTitle>
            <CardDescription>Recent satellite imagery and foot traffic data</CardDescription>
          </div>
          <Select defaultValue="walmart">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="walmart">Walmart Stores</SelectItem>
              <SelectItem value="target">Target Stores</SelectItem>
              <SelectItem value="amazon">Amazon Warehouses</SelectItem>
              <SelectItem value="oil">Oil Refineries</SelectItem>
              <SelectItem value="ports">Major Ports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg border">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Satellite imagery of retail location"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-600">
              <ArrowUp className="mr-1 h-3 w-3" />
              Activity
            </Badge>
            <span className="rounded-md bg-black/70 px-2 py-1 text-xs text-white">+12% vs. last month</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Analysis</h4>
          <p className="text-sm text-muted-foreground">
            Satellite imagery shows increased parking lot activity at Walmart locations compared to the previous month.
            This correlates with the company's recent promotional events and could indicate stronger-than-expected
            quarterly sales.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium">Parking Lot Occupancy</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  12%
                </Badge>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[72%] rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium">Delivery Truck Activity</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  8%
                </Badge>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[68%] rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

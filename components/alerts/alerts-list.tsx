"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, Bell, Trash2 } from "lucide-react"

interface Alert {
  id: string
  stocks: string[]
  frequency: string
  email: string
  createdAt: string
}

export function AlertsList() {
  // In a real app, this would come from an API or state management
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      stocks: ["AAPL", "MSFT", "GOOGL"],
      frequency: "daily",
      email: "user@example.com",
      createdAt: "2023-04-01T12:00:00Z",
    },
    {
      id: "2",
      stocks: ["TSLA", "NVDA"],
      frequency: "weekly",
      email: "user@example.com",
      createdAt: "2023-04-02T14:30:00Z",
    },
  ])

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
    toast({
      title: "Alert deleted",
      description: "The alert has been removed from your configuration.",
    })
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No alerts configured</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">You haven't set up any stock alerts yet.</p>
        <Button variant="outline" onClick={() => {}}>
          Configure Your First Alert
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">
                  <Bell className="h-4 w-4 inline mr-2" />
                  {alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)} Alert
                </CardTitle>
                <CardDescription>{alert.email}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(alert.id)} aria-label="Delete alert">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {alert.stocks.map((stock) => (
                <Badge key={stock} variant="secondary">
                  {stock}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            Created on {new Date(alert.createdAt).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

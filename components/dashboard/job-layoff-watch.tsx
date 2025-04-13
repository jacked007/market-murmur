"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface JobLayoffWatchProps {
  className?: string
}

const data = [
  { month: "Jan", postings: 120 },
  { month: "Feb", postings: 140 },
  { month: "Mar", postings: 160 },
  { month: "Apr", postings: 180 },
  { month: "May", postings: 200 },
  { month: "Jun", postings: 220 },
  { month: "Jul", postings: 240 },
  { month: "Aug", postings: 220 },
  { month: "Sep", postings: 200 },
  { month: "Oct", postings: 180 },
  { month: "Nov", postings: 160 },
  { month: "Dec", postings: 140 },
]

export function JobLayoffWatch({ className }: JobLayoffWatchProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Job & Layoff Watch</CardTitle>
            <CardDescription>Job posting trends and layoff alerts</CardDescription>
          </div>
          <Select defaultValue="tech">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="postings" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Recent Layoff Alerts</h4>
          <div className="space-y-3">
            {[
              { company: "TechCorp", date: "2023-12-01", count: "500", sector: "Technology" },
              { company: "FinanceX", date: "2023-11-15", count: "300", sector: "Finance" },
              { company: "RetailGiant", date: "2023-11-01", count: "200", sector: "Retail" },
            ].map((layoff, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{layoff.company}</span>
                    <Badge variant="outline">{layoff.sector}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{layoff.count} employees affected</p>
                </div>
                <span className="text-xs text-muted-foreground">{layoff.date}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

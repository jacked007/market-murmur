"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function NewsPanel() {
  const [category, setCategory] = useState("all")
  const [selectedSources, setSelectedSources] = useState<string[]>(["all"])

  // Mock news data
  const allNews = [
    {
      id: 1,
      title: "Apple announces new AI features for iPhone",
      source: "TechCrunch",
      date: "2023-12-15",
      url: "#",
      stocks: ["AAPL"],
      sentiment: "Positive",
      category: "product",
      content:
        "Apple has unveiled a suite of new AI features for the iPhone, leveraging on-device machine learning to enhance privacy while delivering powerful capabilities. The announcement comes as tech giants race to integrate AI into consumer products.",
    },
    {
      id: 2,
      title: "Tesla faces production delays at Berlin Gigafactory",
      source: "Reuters",
      date: "2023-12-14",
      url: "#",
      stocks: ["TSLA"],
      sentiment: "Negative",
      category: "operations",
      content:
        "Tesla is experiencing significant production delays at its Berlin Gigafactory due to supply chain constraints and regulatory hurdles. The company has revised its production targets for the quarter, potentially impacting vehicle delivery estimates.",
    },
    {
      id: 3,
      title: "Microsoft and OpenAI expand partnership with $10B investment",
      source: "Bloomberg",
      date: "2023-12-13",
      url: "#",
      stocks: ["MSFT"],
      sentiment: "Positive",
      category: "partnership",
      content:
        "Microsoft has announced a $10 billion investment in OpenAI, expanding their strategic partnership. The deal gives Microsoft exclusive access to OpenAI's technology for integration into its cloud and consumer products, strengthening its position in the AI race.",
    },
    {
      id: 4,
      title: "Amazon announces layoffs in devices division",
      source: "CNBC",
      date: "2023-12-12",
      url: "#",
      stocks: ["AMZN"],
      sentiment: "Negative",
      category: "workforce",
      content:
        "Amazon is cutting jobs in its devices division, affecting teams working on Alexa and Echo products. The move comes as part of a broader cost-cutting initiative as the company focuses on improving profitability in its consumer electronics business.",
    },
    {
      id: 5,
      title: "Meta's Reality Labs continues to lose billions despite VR push",
      source: "Wall Street Journal",
      date: "2023-12-11",
      url: "#",
      stocks: ["META"],
      sentiment: "Negative",
      category: "financial",
      content:
        "Meta's Reality Labs division reported another quarter of substantial losses, burning through billions in its pursuit of metaverse technology. Investors are growing concerned about the timeline for profitability as the company continues its expensive bet on virtual reality.",
    },
    {
      id: 6,
      title: "Nvidia unveils next-generation AI chips, stock surges",
      source: "Financial Times",
      date: "2023-12-10",
      url: "#",
      stocks: ["NVDA"],
      sentiment: "Positive",
      category: "product",
      content:
        "Nvidia has announced its next-generation AI chips, claiming performance improvements of up to 30% over previous models. The announcement triggered a surge in the company's stock price as analysts predict increased demand from data centers and AI researchers.",
    },
    {
      id: 7,
      title: "Google Cloud secures major government contract",
      source: "TechCrunch",
      date: "2023-12-09",
      url: "#",
      stocks: ["GOOGL"],
      sentiment: "Positive",
      category: "contract",
      content:
        "Google Cloud has won a significant multi-year contract with the U.S. government, valued at over $1 billion. The deal represents a major win for Google in the competitive cloud services market, where it competes with AWS and Microsoft Azure.",
    },
    {
      id: 8,
      title: "JPMorgan increases interest rate forecasts after Fed comments",
      source: "Bloomberg",
      date: "2023-12-08",
      url: "#",
      stocks: ["JPM"],
      sentiment: "Neutral",
      category: "financial",
      content:
        "JPMorgan has revised its interest rate forecasts following recent Federal Reserve comments, predicting rates will remain higher for longer than previously anticipated. The bank's analysts cite persistent inflation concerns as the primary driver behind the Fed's cautious stance.",
    },
  ]

  const sources = ["TechCrunch", "Reuters", "Bloomberg", "CNBC", "Wall Street Journal", "Financial Times"]
  const categories = ["all", "product", "operations", "partnership", "workforce", "financial", "contract"]

  const toggleSource = (source: string) => {
    if (source === "all") {
      setSelectedSources(["all"])
      return
    }

    const newSources = selectedSources.filter((s) => s !== "all")
    if (newSources.includes(source)) {
      const filtered = newSources.filter((s) => s !== source)
      setSelectedSources(filtered.length ? filtered : ["all"])
    } else {
      setSelectedSources([...newSources, source])
    }
  }

  const filteredNews = allNews.filter((news) => {
    const categoryMatch = category === "all" || news.category === category
    const sourceMatch = selectedSources.includes("all") || selectedSources.includes(news.source)
    return categoryMatch && sourceMatch
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle>Latest News</CardTitle>
              <CardDescription>Recent headlines affecting stocks</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="all" onValueChange={setCategory} className="w-full sm:w-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="all" className="text-xs h-7">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="product" className="text-xs h-7">
                    Product
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="text-xs h-7">
                    Financial
                  </TabsTrigger>
                  <TabsTrigger value="partnership" className="text-xs h-7">
                    Partnership
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">News Sources</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="source-all"
                          checked={selectedSources.includes("all")}
                          onCheckedChange={() => setSelectedSources(["all"])}
                        />
                        <label htmlFor="source-all" className="text-sm">
                          All Sources
                        </label>
                      </div>
                      {sources.map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={`source-${source}`}
                            checked={selectedSources.includes(source)}
                            onCheckedChange={() => toggleSource(source)}
                            disabled={selectedSources.includes("all")}
                          />
                          <label htmlFor={`source-${source}`} className="text-sm">
                            {source}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <div key={item.id} className="flex flex-col p-4 border rounded-lg">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0",
                      item.sentiment === "Positive"
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : item.sentiment === "Negative"
                          ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
                    )}
                  >
                    {item.sentiment}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.content}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span>{item.source}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {item.stocks.map((stock) => (
                        <Badge key={stock} variant="secondary" className="text-xs">
                          {stock}
                        </Badge>
                      ))}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

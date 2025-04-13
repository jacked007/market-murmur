import { NextResponse } from "next/server"
import { getCompanyNews } from "@/lib/finnhub"

export async function GET(request: Request, { params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase()

  try {
    // Calculate date range for news (last 7 days)
    const today = new Date()
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 7)

    const toDate = today.toISOString().split("T")[0]
    const fromDate = lastWeek.toISOString().split("T")[0]

    // Fetch news from Finnhub
    const newsData = await getCompanyNews(ticker, fromDate, toDate)

    // Process and format the news data
    const formattedNews = newsData.slice(0, 10).map((item: any) => ({
      id: item.id || Math.random().toString(36).substring(2, 15),
      title: item.headline,
      source: item.source,
      date: new Date(item.datetime * 1000).toISOString().split("T")[0],
      url: item.url,
      stocks: [ticker],
      sentiment: determineSentiment(item.summary || ""),
      content: item.summary,
      category: determineCategory(item.category || "", item.summary || ""),
    }))

    return NextResponse.json(formattedNews)
  } catch (error) {
    console.error("Error fetching news data:", error)

    // Fallback to mock data
    const mockData = [
      {
        id: 1,
        title: `${ticker} announces quarterly results`,
        source: "Financial Times",
        date: new Date().toISOString().split("T")[0],
        url: "#",
        stocks: [ticker],
        sentiment: "Neutral",
        content: `${ticker} released its quarterly earnings report today, showing mixed results across different business segments.`,
        category: "financial",
      },
      {
        id: 2,
        title: `Analysts update outlook for ${ticker}`,
        source: "Bloomberg",
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // Yesterday
        url: "#",
        stocks: [ticker],
        sentiment: "Positive",
        content: `Several analysts have updated their price targets for ${ticker} following recent market developments.`,
        category: "analysis",
      },
    ]

    return NextResponse.json(mockData)
  }
}

// Helper function to determine sentiment from text
function determineSentiment(text: string): "Positive" | "Negative" | "Neutral" {
  const positiveWords = [
    "growth",
    "profit",
    "increase",
    "up",
    "gain",
    "positive",
    "strong",
    "beat",
    "exceed",
    "success",
  ]
  const negativeWords = [
    "loss",
    "decline",
    "decrease",
    "down",
    "negative",
    "weak",
    "miss",
    "fail",
    "struggle",
    "concern",
  ]

  let positiveCount = 0
  let negativeCount = 0

  const words = text.toLowerCase().split(/\s+/)

  words.forEach((word) => {
    if (positiveWords.some((pw) => word.includes(pw))) positiveCount++
    if (negativeWords.some((nw) => word.includes(nw))) negativeCount++
  })

  if (positiveCount > negativeCount + 1) return "Positive"
  if (negativeCount > positiveCount + 1) return "Negative"
  return "Neutral"
}

// Helper function to determine news category
function determineCategory(category: string, text: string): string {
  if (category) return category.toLowerCase()

  const categoryKeywords = {
    product: ["product", "launch", "release", "feature", "update"],
    financial: ["earnings", "revenue", "profit", "financial", "quarter", "fiscal"],
    partnership: ["partner", "collaboration", "alliance", "deal", "agreement"],
    operations: ["production", "supply", "chain", "manufacturing", "logistics"],
    workforce: ["employee", "layoff", "hire", "talent", "workforce", "staff"],
  }

  const textLower = text.toLowerCase()

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => textLower.includes(keyword))) {
      return category
    }
  }

  return "general"
}

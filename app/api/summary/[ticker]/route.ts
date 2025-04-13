import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { generateSummary } from "@/lib/gemini"

// Function to fetch data from other endpoints
async function fetchTickerData(ticker: string) {
  // In a real implementation, we would fetch from Supabase
  // For this demo, we'll simulate the data

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data for the summary
  const summaries = {
    AAPL: {
      sentiment: {
        reddit: { score: 0.82, change: 0.12 },
        twitter: { score: 0.65, change: 0.08 },
        instagram: { score: 0.75, change: 0.1 },
        overall: { score: 0.74, change: 0.09 },
      },
      satellite: {
        footTraffic: { value: 85, change: 8 },
        manufacturingActivity: { value: 78, change: -3 },
      },
      jobs: {
        total: { count: 1250, change: 8 },
        engineering: { count: 580, change: 12 },
        layoffs: [],
      },
      earnings: {
        overallSentiment: 0.8,
        change: 0.3,
        keyTopics: ["Product Demand", "Margins", "Supply Chain"],
      },
    },
    MSFT: {
      sentiment: {
        reddit: { score: 0.67, change: 0.05 },
        twitter: { score: 0.58, change: -0.03 },
        instagram: { score: 0.72, change: 0.08 },
        overall: { score: 0.66, change: 0.03 },
      },
      satellite: {
        dataCenter: { value: 95, change: 15 },
        officeActivity: { value: 72, change: 8 },
      },
      jobs: {
        total: { count: 1850, change: 12 },
        engineering: { count: 920, change: 18 },
        layoffs: [],
      },
      earnings: {
        overallSentiment: 0.7,
        change: 0.1,
        keyTopics: ["Cloud Growth", "AI Services", "Enterprise Spending"],
      },
    },
    TSLA: {
      sentiment: {
        reddit: { score: -0.35, change: -0.28 },
        twitter: { score: -0.42, change: -0.15 },
        instagram: { score: 0.12, change: -0.18 },
        overall: { score: -0.22, change: -0.2 },
      },
      satellite: {
        factoryActivity: { value: 85, change: -5 },
        deliveryActivity: { value: 75, change: -8 },
      },
      jobs: {
        total: { count: 980, change: -15 },
        engineering: { count: 420, change: -8 },
        layoffs: [{ date: "2023-11-15", count: 300 }],
      },
      earnings: {
        overallSentiment: 0.3,
        change: -0.2,
        keyTopics: ["Production Challenges", "Margins", "Competition"],
      },
    },
    AMZN: {
      sentiment: {
        reddit: { score: 0.53, change: 0.08 },
        twitter: { score: 0.48, change: 0.05 },
        instagram: { score: 0.61, change: 0.12 },
        overall: { score: 0.54, change: 0.08 },
      },
      satellite: {
        fulfillmentActivity: { value: 95, change: 18 },
        deliveryActivity: { value: 95, change: 22 },
      },
      jobs: {
        total: { count: 2250, change: 22 },
        operations: { count: 870, change: 35 },
        layoffs: [{ date: "2023-12-01", count: 200 }],
      },
      earnings: {
        overallSentiment: 0.6,
        change: 0.2,
        keyTopics: ["AWS", "Operational Efficiency", "Advertising"],
      },
    },
    GOOGL: {
      sentiment: {
        reddit: { score: 0.28, change: -0.05 },
        twitter: { score: 0.35, change: 0.02 },
        instagram: { score: 0.42, change: 0.04 },
        overall: { score: 0.35, change: 0.0 },
      },
      satellite: {
        officeActivity: { value: 72, change: 5 },
        dataCenter: { value: 88, change: 12 },
      },
      jobs: {
        total: { count: 1650, change: 5 },
        aiRoles: { count: 630, change: 32 },
        layoffs: [],
      },
      earnings: {
        overallSentiment: 0.5,
        change: 0.1,
        keyTopics: ["AI Integration", "YouTube", "Regulatory Challenges"],
      },
    },
  }

  // Try to fetch from Supabase first
  try {
    const supabase = createServerSupabaseClient()

    // Check if we have sentiment data
    const { data: sentimentData, error: sentimentError } = await supabase
      .from("sentiment_data")
      .select("*")
      .eq("ticker", ticker)
      .order("date", { ascending: false })
      .limit(1)

    if (sentimentError) {
      console.error("Error fetching sentiment data:", sentimentError)
    }

    // If we have real data, use it
    if (sentimentData && sentimentData.length > 0) {
      // TODO: Implement real data fetching from all tables
      // For now, we'll use the mock data
    }
  } catch (error) {
    console.error("Error connecting to Supabase:", error)
  }

  return summaries[ticker as keyof typeof summaries]
}

export async function GET(request: Request, { params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase()

  try {
    // Fetch data from other endpoints
    const data = await fetchTickerData(ticker)

    if (!data) {
      return NextResponse.json({ error: "Ticker not found" }, { status: 404 })
    }

    // Generate AI summary using Gemini
    const summary = await generateSummary(data, ticker)

    // Return the summary and data
    return NextResponse.json({
      ticker,
      summary,
      sentiment:
        data.sentiment.overall.score > 0.6 ? "Positive" : data.sentiment.overall.score < 0.4 ? "Negative" : "Neutral",
      confidence: data.sentiment.overall.score > 0.7 || data.sentiment.overall.score < 0.3 ? "High" : "Medium",
      lastUpdated: new Date().toISOString(),
      dataPoints: ["Social Media", "Satellite", "Job Postings", "Earnings Call"],
    })
  } catch (error) {
    console.error("Error in summary API:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}

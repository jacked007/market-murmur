import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // First, seed the stocks table (which is referenced by other tables)
    // Removed the industry field since it doesn't exist in the schema
    const stocksData = [
      { ticker: "AAPL", name: "Apple Inc.", sector: "Technology" },
      { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
      { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
      { ticker: "AMZN", name: "Amazon.com, Inc.", sector: "Consumer Cyclical" },
      { ticker: "META", name: "Meta Platforms, Inc.", sector: "Technology" },
      { ticker: "TSLA", name: "Tesla, Inc.", sector: "Consumer Cyclical" },
      { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
      { ticker: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services" },
      { ticker: "V", name: "Visa Inc.", sector: "Financial Services" },
      { ticker: "WMT", name: "Walmart Inc.", sector: "Consumer Defensive" },
    ]

    // Upsert stocks data
    const { error: stocksError } = await supabase.from("stocks").upsert(stocksData)

    if (stocksError) {
      console.error("Error seeding stocks data:", stocksError)
      return NextResponse.json({ error: "Failed to seed stocks data" }, { status: 500 })
    }

    // Now seed sentiment data (after stocks are inserted)
    const sentimentData = [
      {
        ticker: "AAPL",
        source: "reddit",
        score: 0.82,
        change: 0.12,
        posts_count: 245,
        keywords: ["product launch", "earnings", "dividends"],
        date: new Date().toISOString().split("T")[0],
      },
      {
        ticker: "AAPL",
        source: "twitter",
        score: 0.65,
        change: 0.08,
        posts_count: 1250,
        keywords: ["innovation", "market share", "product quality"],
        date: new Date().toISOString().split("T")[0],
      },
      {
        ticker: "MSFT",
        source: "reddit",
        score: 0.67,
        change: 0.05,
        posts_count: 180,
        keywords: ["cloud services", "AI integration", "enterprise solutions"],
        date: new Date().toISOString().split("T")[0],
      },
      {
        ticker: "TSLA",
        source: "twitter",
        score: -0.35,
        change: -0.28,
        posts_count: 310,
        keywords: ["production delays", "competition", "quality issues"],
        date: new Date().toISOString().split("T")[0],
      },
    ]

    const { error: sentimentError } = await supabase.from("sentiment_data").upsert(sentimentData)

    if (sentimentError) {
      console.error("Error seeding sentiment data:", sentimentError)
      return NextResponse.json({ error: "Failed to seed sentiment data" }, { status: 500 })
    }

    // Seed satellite data
    const satelliteData = [
      {
        ticker: "AAPL",
        location_name: "Apple Park, Cupertino",
        activity_level: 92,
        activity_change: 5,
        coordinates: { lat: 37.3346, lng: -122.009 },
        metrics: {
          footTraffic: { value: 85, change: 8 },
          parkingOccupancy: { value: 82, change: 12 },
        },
        analysis: "Increased foot traffic at Apple retail locations compared to the previous month.",
        date: new Date().toISOString().split("T")[0],
      },
      {
        ticker: "TSLA",
        location_name: "Fremont Factory",
        activity_level: 85,
        activity_change: -5,
        coordinates: { lat: 37.4924, lng: -121.9465 },
        metrics: {
          footTraffic: { value: 82, change: -3 },
          parkingOccupancy: { value: 85, change: -2 },
        },
        analysis: "Decreased activity at manufacturing facilities, potentially indicating production challenges.",
        date: new Date().toISOString().split("T")[0],
      },
    ]

    const { error: satelliteError } = await supabase.from("satellite_data").upsert(satelliteData)

    if (satelliteError) {
      console.error("Error seeding satellite data:", satelliteError)
      return NextResponse.json({ error: "Failed to seed satellite data" }, { status: 500 })
    }

    // Seed job data
    const jobData = [
      {
        ticker: "AAPL",
        total_count: 1250,
        total_change: 8,
        engineering_count: 580,
        engineering_change: 12,
        marketing_count: 180,
        marketing_change: -3,
        operations_count: 280,
        operations_change: 15,
        layoffs: [],
        analysis: "Apple's job postings show an 8% overall increase, with significant growth in engineering roles.",
        date: new Date().toISOString().split("T")[0],
      },
      {
        ticker: "TSLA",
        total_count: 980,
        total_change: -15,
        engineering_count: 420,
        engineering_change: -8,
        marketing_count: 65,
        marketing_change: -25,
        operations_count: 410,
        operations_change: -18,
        layoffs: [{ date: "2023-11-15", count: 300, department: "Manufacturing" }],
        analysis:
          "Tesla's job postings have decreased 15% overall, with significant reductions in manufacturing and operations roles.",
        date: new Date().toISOString().split("T")[0],
      },
    ]

    const { error: jobError } = await supabase.from("job_data").upsert(jobData)

    if (jobError) {
      console.error("Error seeding job data:", jobError)
      return NextResponse.json({ error: "Failed to seed job data" }, { status: 500 })
    }

    // Seed news data
    const newsData = [
      {
        title: "Apple announces new AI features for iPhone",
        source: "TechCrunch",
        date: new Date().toISOString().split("T")[0],
        url: "https://example.com/news/1",
        stocks: ["AAPL"],
        sentiment: "Positive",
        content:
          "Apple has unveiled a suite of new AI features for the iPhone, leveraging on-device machine learning to enhance privacy while delivering powerful capabilities.",
        category: "product",
      },
      {
        title: "Tesla faces production delays at Berlin Gigafactory",
        source: "Reuters",
        date: new Date().toISOString().split("T")[0],
        url: "https://example.com/news/2",
        stocks: ["TSLA"],
        sentiment: "Negative",
        content:
          "Tesla is experiencing significant production delays at its Berlin Gigafactory due to supply chain constraints and regulatory hurdles.",
        category: "operations",
      },
    ]

    const { error: newsError } = await supabase.from("news").upsert(newsData)

    if (newsError) {
      console.error("Error seeding news data:", newsError)
      return NextResponse.json({ error: "Failed to seed news data" }, { status: 500 })
    }

    // Seed signals data
    const signalsData = [
      {
        ticker: "TSLA",
        type: "Satellite",
        description: "Increased activity at Tesla Gigafactory",
        date: new Date().toISOString().split("T")[0],
        impact: "Positive",
        strength: "High",
        lead_time: "3 days before 5.2% price increase",
      },
      {
        ticker: "AAPL",
        type: "Social Media",
        description: "Negative sentiment spike on product quality",
        date: new Date().toISOString().split("T")[0],
        impact: "Negative",
        strength: "Medium",
        lead_time: "24 hours before 2.1% price drop",
      },
    ]

    const { error: signalsError } = await supabase.from("signals").upsert(signalsData)

    if (signalsError) {
      console.error("Error seeding signals data:", signalsError)
      return NextResponse.json({ error: "Failed to seed signals data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

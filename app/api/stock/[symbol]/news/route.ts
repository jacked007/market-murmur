import { NextResponse } from "next/server"
import { getCompanyNews } from "@/lib/finnhub-server"
import { getMockCompanyNews } from "@/lib/finnhub"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  try {
    const symbol = params.symbol.toUpperCase()

    // Get news for the last 7 days
    const today = new Date()
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 7)

    const toDate = today.toISOString().split("T")[0]
    const fromDate = sevenDaysAgo.toISOString().split("T")[0]

    try {
      // Try to get real data first
      const news = await getCompanyNews(symbol, fromDate, toDate)
      return NextResponse.json(news)
    } catch (error) {
      // Fall back to mock data if real API fails
      console.log("Falling back to mock data for company news")
      const mockNews = getMockCompanyNews(symbol)
      return NextResponse.json(mockNews)
    }
  } catch (error) {
    console.error("Error in company news API route:", error)
    return NextResponse.json({ error: "Failed to fetch company news" }, { status: 500 })
  }
}

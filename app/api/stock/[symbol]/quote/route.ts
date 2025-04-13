import { NextResponse } from "next/server"
import { getStockQuote } from "@/lib/finnhub-server"
import { getMockStockQuote } from "@/lib/finnhub"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  try {
    const symbol = params.symbol.toUpperCase()

    try {
      // Try to get real data first
      const quote = await getStockQuote(symbol)
      return NextResponse.json(quote)
    } catch (error) {
      // Fall back to mock data if real API fails
      console.log("Falling back to mock data for stock quote")
      const mockQuote = getMockStockQuote(symbol)
      return NextResponse.json(mockQuote)
    }
  } catch (error) {
    console.error("Error in stock quote API route:", error)
    return NextResponse.json({ error: "Failed to fetch stock quote" }, { status: 500 })
  }
}

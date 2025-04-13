import { NextResponse } from "next/server"
import { searchSymbols } from "@/lib/finnhub-server"
import { getMockSearchResults } from "@/lib/finnhub"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
    }

    try {
      // Try to get real data first
      const results = await searchSymbols(query)
      return NextResponse.json(results)
    } catch (error) {
      // Fall back to mock data if real API fails
      console.log("Falling back to mock data for symbol search")
      const mockResults = getMockSearchResults(query)
      return NextResponse.json(mockResults)
    }
  } catch (error) {
    console.error("Error in symbol search API route:", error)
    return NextResponse.json({ error: "Failed to search symbols" }, { status: 500 })
  }
}

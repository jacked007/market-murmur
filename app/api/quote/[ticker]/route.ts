import { NextResponse } from "next/server"

// Mock stock quote data for different tickers
const quoteData = {
  AAPL: {
    ticker: "AAPL",
    price: 182.63,
    change: 1.25,
    percentChange: 0.69,
    high: 183.92,
    low: 181.47,
    open: 181.95,
    previousClose: 181.38,
    name: "Apple Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
    industry: "Technology",
    marketCap: 2850000000000,
    lastUpdated: new Date().toISOString(),
  },
  MSFT: {
    ticker: "MSFT",
    price: 417.88,
    change: 2.35,
    percentChange: 0.57,
    high: 418.23,
    low: 414.45,
    open: 415.76,
    previousClose: 415.53,
    name: "Microsoft Corporation",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png",
    industry: "Technology",
    marketCap: 3100000000000,
    lastUpdated: new Date().toISOString(),
  },
  GOOGL: {
    ticker: "GOOGL",
    price: 164.32,
    change: -0.87,
    percentChange: -0.53,
    high: 165.45,
    low: 163.78,
    open: 165.12,
    previousClose: 165.19,
    name: "Alphabet Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOGL.png",
    industry: "Technology",
    marketCap: 2050000000000,
    lastUpdated: new Date().toISOString(),
  },
  AMZN: {
    ticker: "AMZN",
    price: 182.87,
    change: 1.43,
    percentChange: 0.79,
    high: 183.25,
    low: 181.02,
    open: 181.56,
    previousClose: 181.44,
    name: "Amazon.com, Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png",
    industry: "Consumer Cyclical",
    marketCap: 1890000000000,
    lastUpdated: new Date().toISOString(),
  },
  META: {
    ticker: "META",
    price: 474.12,
    change: 3.56,
    percentChange: 0.76,
    high: 475.23,
    low: 470.45,
    open: 471.32,
    previousClose: 470.56,
    name: "Meta Platforms, Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/META.png",
    industry: "Technology",
    marketCap: 1210000000000,
    lastUpdated: new Date().toISOString(),
  },
  TSLA: {
    ticker: "TSLA",
    price: 172.63,
    change: -3.25,
    percentChange: -1.85,
    high: 176.92,
    low: 171.47,
    open: 176.45,
    previousClose: 175.88,
    name: "Tesla, Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png",
    industry: "Automotive",
    marketCap: 548000000000,
    lastUpdated: new Date().toISOString(),
  },
  NVDA: {
    ticker: "NVDA",
    price: 879.25,
    change: 12.35,
    percentChange: 1.42,
    high: 882.45,
    low: 865.78,
    open: 868.92,
    previousClose: 866.9,
    name: "NVIDIA Corporation",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NVDA.png",
    industry: "Technology",
    marketCap: 2170000000000,
    lastUpdated: new Date().toISOString(),
  },
  JPM: {
    ticker: "JPM",
    price: 196.42,
    change: 0.87,
    percentChange: 0.45,
    high: 197.23,
    low: 195.67,
    open: 196.12,
    previousClose: 195.55,
    name: "JPMorgan Chase & Co.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png",
    industry: "Financial Services",
    marketCap: 567000000000,
    lastUpdated: new Date().toISOString(),
  },
  V: {
    ticker: "V",
    price: 275.63,
    change: 1.25,
    percentChange: 0.46,
    high: 276.92,
    low: 274.47,
    open: 274.95,
    previousClose: 274.38,
    name: "Visa Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/V.png",
    industry: "Financial Services",
    marketCap: 567000000000,
    lastUpdated: new Date().toISOString(),
  },
  WMT: {
    ticker: "WMT",
    price: 59.87,
    change: 0.43,
    percentChange: 0.72,
    high: 60.25,
    low: 59.42,
    open: 59.56,
    previousClose: 59.44,
    name: "Walmart Inc.",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/WMT.png",
    industry: "Consumer Defensive",
    marketCap: 482000000000,
    lastUpdated: new Date().toISOString(),
  },
}

export async function GET(request: Request, { params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase()

  try {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if we have mock data for this ticker
    if (!quoteData[ticker as keyof typeof quoteData]) {
      // Generate random data for unknown tickers
      const randomData = {
        ticker,
        price: 100 + Math.random() * 100,
        change: Math.random() * 6 - 3,
        percentChange: Math.random() * 3 - 1.5,
        high: 105 + Math.random() * 100,
        low: 95 + Math.random() * 100,
        open: 100 + Math.random() * 100,
        previousClose: 100 + Math.random() * 100,
        name: `${ticker} Inc.`,
        logo: "",
        industry: "Unknown",
        marketCap: 1000000000 + Math.random() * 1000000000000,
        lastUpdated: new Date().toISOString(),
      }

      return NextResponse.json(randomData)
    }

    // Return mock data for known tickers
    return NextResponse.json(quoteData[ticker as keyof typeof quoteData])
  } catch (error) {
    console.error("Error in quote API:", error)
    return NextResponse.json({ error: "Failed to fetch quote data" }, { status: 500 })
  }
}

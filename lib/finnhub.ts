// This file contains types and mock data for client-side use
// Real API calls should be made through server components or API routes

export interface StockQuote {
  c: number // Current price
  d: number // Change
  dp: number // Percent change
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
  t: number // Timestamp
}

export interface NewsItem {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

// Mock data functions for development and testing
export function getMockStockQuote(symbol: string): StockQuote {
  return {
    c: 150.25 + Math.random() * 10, // Current price
    d: Math.random() * 5 - 2.5, // Change
    dp: Math.random() * 3 - 1.5, // Percent change
    h: 155.75, // High price of the day
    l: 148.2, // Low price of the day
    o: 149.8, // Open price of the day
    pc: 149.5, // Previous close price
    t: Date.now() / 1000, // Timestamp
  }
}

export function getMockCompanyNews(symbol: string): NewsItem[] {
  return [
    {
      category: "technology",
      datetime: Math.floor(Date.now() / 1000) - 3600,
      headline: `${symbol} Announces New Product Line`,
      id: 1,
      image: "https://via.placeholder.com/800x400",
      related: symbol,
      source: "Financial Times",
      summary: `${symbol} has announced a new product line that is expected to boost revenue in the coming quarters.`,
      url: "https://example.com/news/1",
    },
    {
      category: "business",
      datetime: Math.floor(Date.now() / 1000) - 7200,
      headline: `${symbol} Reports Strong Quarterly Earnings`,
      id: 2,
      image: "https://via.placeholder.com/800x400",
      related: symbol,
      source: "Wall Street Journal",
      summary: `${symbol} reported earnings that exceeded analyst expectations, driven by strong growth in its core business.`,
      url: "https://example.com/news/2",
    },
    {
      category: "market",
      datetime: Math.floor(Date.now() / 1000) - 10800,
      headline: `Analysts Upgrade ${symbol} Stock Rating`,
      id: 3,
      image: "https://via.placeholder.com/800x400",
      related: symbol,
      source: "Bloomberg",
      summary: `Several analysts have upgraded their rating for ${symbol} stock, citing improved growth prospects.`,
      url: "https://example.com/news/3",
    },
  ]
}

export function getMockSearchResults(query: string): any {
  // Common stock tickers that might match the query
  const mockStocks = [
    { description: "Apple Inc", displaySymbol: "AAPL", symbol: "AAPL", type: "Common Stock" },
    { description: "Microsoft Corporation", displaySymbol: "MSFT", symbol: "MSFT", type: "Common Stock" },
    { description: "Amazon.com Inc", displaySymbol: "AMZN", symbol: "AMZN", type: "Common Stock" },
    { description: "Alphabet Inc Class A", displaySymbol: "GOOGL", symbol: "GOOGL", type: "Common Stock" },
    { description: "Meta Platforms Inc", displaySymbol: "META", symbol: "META", type: "Common Stock" },
    { description: "Tesla Inc", displaySymbol: "TSLA", symbol: "TSLA", type: "Common Stock" },
    { description: "NVIDIA Corporation", displaySymbol: "NVDA", symbol: "NVDA", type: "Common Stock" },
    { description: "JPMorgan Chase & Co", displaySymbol: "JPM", symbol: "JPM", type: "Common Stock" },
    { description: "Visa Inc", displaySymbol: "V", symbol: "V", type: "Common Stock" },
    { description: "Walmart Inc", displaySymbol: "WMT", symbol: "WMT", type: "Common Stock" },
  ]

  // Filter stocks based on the query
  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.description.toLowerCase().includes(query.toLowerCase()),
  )

  return {
    count: filteredStocks.length,
    result: filteredStocks,
  }
}

export function getMockEarnings(ticker: string): any {
  return [
    {
      actual: 1.25,
      estimate: 1.2,
      surprise: 0.05,
      symbol: ticker,
      period: "2023-12-01",
      year: 2023,
      quarter: 4,
    },
    {
      actual: 1.1,
      estimate: 1.05,
      surprise: 0.05,
      symbol: ticker,
      period: "2023-09-01",
      year: 2023,
      quarter: 3,
    },
  ]
}

export function getMockSocialSentiment(ticker: string): any {
  return {
    reddit: [
      {
        mention: 120,
        positiveScore: 0.7,
        negativeScore: 0.3,
        score: 0.6,
      },
    ],
    twitter: [
      {
        mention: 250,
        positiveScore: 0.6,
        negativeScore: 0.4,
        score: 0.55,
      },
    ],
  }
}

export function getMockSentiment(ticker: string): any {
  return {
    buzz: {
      articlesInLastWeek: 50,
      positiveScore: 0.6,
      negativeScore: 0.4,
      buzzWords: ["AI", "Growth", "Innovation"],
    },
    companyNewsScore: 0.6,
    sectorAverageBullishPercent: 0.5,
    sectorAverageNewsScore: 0.5,
    sentiment: 0.6,
    sentimentChange: 0.05,
  }
}

export function getEarnings(ticker: string): any {
  return getMockEarnings(ticker)
}

export function getCompanyNews(symbol: string, from: string, to: string): any {
  return getMockCompanyNews(symbol)
}

export function getSocialSentiment(ticker: string): any {
  return getMockSocialSentiment(ticker)
}

export function getSentiment(ticker: string): any {
  return getMockSentiment(ticker)
}

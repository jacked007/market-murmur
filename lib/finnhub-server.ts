// This file should only be imported in server components or API routes
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

export async function getStockQuote(symbol: string) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
      { next: { revalidate: 60 } }, // Revalidate every minute
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch stock quote: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching stock quote:", error)
    throw error
  }
}

export async function getCompanyNews(symbol: string, from: string, to: string) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`,
      { next: { revalidate: 300 } }, // Revalidate every 5 minutes
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch company news: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching company news:", error)
    throw error
  }
}

export async function searchSymbols(query: string) {
  try {
    const response = await fetch(`https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`)

    if (!response.ok) {
      throw new Error(`Failed to search symbols: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error searching symbols:", error)
    throw error
  }
}

export async function getCompanyProfile(symbol: string) {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
      { next: { revalidate: 86400 } }, // Revalidate daily
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch company profile: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching company profile:", error)
    throw error
  }
}

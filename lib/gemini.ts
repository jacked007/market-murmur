// Utility functions for working with the Gemini API

export async function generateSummary(data: any, ticker: string) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("Missing Gemini API key")
  }

  const prompt = `
    Generate a concise summary (under 100 words) for ${ticker} based on the following alternative data:
    
    Sentiment Analysis:
    - Overall sentiment: ${data.sentiment.overall.score.toFixed(2)} (change: ${data.sentiment.overall.change > 0 ? "+" : ""}${data.sentiment.overall.change.toFixed(2)})
    - Reddit sentiment: ${data.sentiment.reddit.score.toFixed(2)}
    - Twitter sentiment: ${data.sentiment.twitter.score.toFixed(2)}
    - Instagram sentiment: ${data.sentiment.instagram.score.toFixed(2)}
    
    Satellite Data:
    ${Object.entries(data.satellite)
      .map(
        ([key, value]: [string, any]) =>
          `- ${key}: ${value.value} (change: ${value.change > 0 ? "+" : ""}${value.change}%)`,
      )
      .join("\n")}
    
    Job Market:
    - Total job postings: ${data.jobs.total.count} (change: ${data.jobs.total.change > 0 ? "+" : ""}${data.jobs.total.change}%)
    - Recent layoffs: ${data.jobs.layoffs.length > 0 ? "Yes" : "None reported"}
    
    Earnings Call:
    - Sentiment: ${data.earnings.overallSentiment.toFixed(2)} (change: ${data.earnings.change > 0 ? "+" : ""}${data.earnings.change.toFixed(2)})
    - Key topics: ${data.earnings.keyTopics.join(", ")}
    
    Provide an objective analysis of what this data suggests about the company's current situation and potential future performance.
  `

  try {
    // Updated to use gemini-2.0-flash model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const result = await response.json()

    // Extract the text from the response
    if (result.candidates && result.candidates[0]?.content?.parts && result.candidates[0].content.parts[0]?.text) {
      return result.candidates[0].content.parts[0].text
    } else {
      throw new Error("Unexpected response format from Gemini API")
    }
  } catch (error) {
    console.error("Error generating summary with Gemini:", error)
    return "Unable to generate summary at this time. Please try again later."
  }
}

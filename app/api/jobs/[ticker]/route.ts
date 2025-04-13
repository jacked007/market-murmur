import { NextResponse } from "next/server"

// Mock job posting data for different tickers
const jobsData = {
  AAPL: {
    trends: {
      total: { count: 1250, change: 8 },
      engineering: { count: 580, change: 12 },
      design: { count: 210, change: 5 },
      marketing: { count: 180, change: -3 },
      operations: { count: 280, change: 15 },
    },
    locations: [
      { name: "Cupertino, CA", count: 450, change: 5 },
      { name: "Austin, TX", count: 280, change: 15 },
      { name: "Seattle, WA", count: 180, change: 22 },
      { name: "New York, NY", count: 120, change: 8 },
      { name: "International", count: 220, change: 3 },
    ],
    skills: [
      { name: "Machine Learning", count: 210, change: 25 },
      { name: "iOS Development", count: 180, change: 8 },
      { name: "Hardware Engineering", count: 150, change: 12 },
      { name: "UX Design", count: 120, change: 5 },
      { name: "Supply Chain", count: 95, change: 18 },
    ],
    layoffs: [],
    analysis:
      "Apple's job postings show an 8% overall increase, with significant growth in engineering roles, particularly in machine learning and AI. New office locations in Austin and Seattle show the strongest growth, suggesting geographic expansion of technical teams. No recent layoffs have been reported.",
    lastUpdated: "2023-12-15T08:30:00Z",
  },
  MSFT: {
    trends: {
      total: { count: 1850, change: 12 },
      engineering: { count: 920, change: 18 },
      design: { count: 180, change: 5 },
      marketing: { count: 220, change: 3 },
      operations: { count: 530, change: 8 },
    },
    locations: [
      { name: "Redmond, WA", count: 780, change: 8 },
      { name: "Bellevue, WA", count: 320, change: 12 },
      { name: "San Francisco, CA", count: 250, change: 22 },
      { name: "New York, NY", count: 180, change: 15 },
      { name: "International", count: 320, change: 18 },
    ],
    skills: [
      { name: "Cloud Computing", count: 350, change: 28 },
      { name: "AI/ML", count: 320, change: 35 },
      { name: "Full Stack Development", count: 280, change: 15 },
      { name: "DevOps", count: 220, change: 18 },
      { name: "Product Management", count: 180, change: 8 },
    ],
    layoffs: [],
    analysis:
      "Microsoft's job postings have increased 12% overall, with strong growth in engineering roles focused on cloud computing and AI/ML. This aligns with their strategic focus on Azure and AI services. San Francisco shows the strongest regional growth, suggesting expansion of their AI research teams. No recent layoffs have been reported.",
    lastUpdated: "2023-12-14T09:15:00Z",
  },
  TSLA: {
    trends: {
      total: { count: 980, change: -15 },
      engineering: { count: 420, change: -8 },
      design: { count: 85, change: -12 },
      marketing: { count: 65, change: -25 },
      operations: { count: 410, change: -18 },
    },
    locations: [
      { name: "Fremont, CA", count: 320, change: -12 },
      { name: "Austin, TX", count: 280, change: 5 },
      { name: "Shanghai, China", count: 180, change: -22 },
      { name: "Berlin, Germany", count: 120, change: -28 },
      { name: "Other", count: 80, change: -15 },
    ],
    skills: [
      { name: "Manufacturing", count: 250, change: -15 },
      { name: "Battery Technology", count: 180, change: 8 },
      { name: "Autonomous Driving", count: 150, change: -5 },
      { name: "Software Engineering", count: 220, change: -8 },
      { name: "Supply Chain", count: 120, change: -22 },
    ],
    layoffs: [
      { date: "2023-11-15", count: 300, department: "Manufacturing" },
      { date: "2023-10-20", count: 150, department: "Sales & Marketing" },
    ],
    analysis:
      "Tesla's job postings have decreased 15% overall, with significant reductions in manufacturing and operations roles. This suggests potential production adjustments or efficiency measures. Shanghai and Berlin locations show the largest decreases, while Austin shows modest growth, indicating a shift in manufacturing focus. Recent layoffs in manufacturing and sales departments further support a restructuring narrative.",
    lastUpdated: "2023-12-13T10:45:00Z",
  },
  AMZN: {
    trends: {
      total: { count: 2250, change: 22 },
      engineering: { count: 980, change: 18 },
      design: { count: 180, change: 5 },
      marketing: { count: 220, change: 8 },
      operations: { count: 870, change: 35 },
    },
    locations: [
      { name: "Seattle, WA", count: 580, change: 12 },
      { name: "Arlington, VA", count: 420, change: 28 },
      { name: "New York, NY", count: 320, change: 15 },
      { name: "San Francisco, CA", count: 280, change: 8 },
      { name: "International", count: 650, change: 32 },
    ],
    skills: [
      { name: "Cloud Computing", count: 380, change: 22 },
      { name: "Machine Learning", count: 320, change: 28 },
      { name: "Logistics", count: 280, change: 35 },
      { name: "Software Development", count: 420, change: 18 },
      { name: "Data Science", count: 250, change: 25 },
    ],
    layoffs: [{ date: "2023-12-01", count: 200, department: "Devices" }],
    analysis:
      "Amazon's job postings have increased 22% overall, with exceptional growth in operations and logistics roles (35% increase). This suggests preparation for expanded e-commerce capacity. AWS-related roles also show strong growth. Arlington, VA (HQ2) shows the strongest regional growth at 28%. Recent small layoffs in the devices division indicate potential restructuring of consumer hardware efforts.",
    lastUpdated: "2023-12-12T11:30:00Z",
  },
  GOOGL: {
    trends: {
      total: { count: 1650, change: 5 },
      engineering: { count: 820, change: 12 },
      design: { count: 150, change: -3 },
      marketing: { count: 180, change: -8 },
      operations: { count: 500, change: 3 },
    },
    locations: [
      { name: "Mountain View, CA", count: 520, change: 3 },
      { name: "New York, NY", count: 380, change: 8 },
      { name: "Seattle, WA", count: 280, change: 12 },
      { name: "Austin, TX", count: 220, change: 15 },
      { name: "International", count: 250, change: -5 },
    ],
    skills: [
      { name: "Machine Learning", count: 350, change: 28 },
      { name: "AI Research", count: 280, change: 35 },
      { name: "Cloud Computing", count: 220, change: 18 },
      { name: "Mobile Development", count: 180, change: -5 },
      { name: "Data Science", count: 250, change: 22 },
    ],
    layoffs: [],
    analysis:
      "Google's job postings show modest 5% overall growth, with strong increases in AI and machine learning roles (28-35% growth). This aligns with their strategic focus on AI integration across products. Engineering hiring is up 12%, while marketing roles have decreased 8%, suggesting a shift toward technical talent. No recent layoffs have been reported.",
    lastUpdated: "2023-12-11T12:15:00Z",
  },
}

export async function GET(request: Request, { params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase()

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (!jobsData[ticker as keyof typeof jobsData]) {
    return NextResponse.json({ error: "Ticker not found" }, { status: 404 })
  }

  return NextResponse.json(jobsData[ticker as keyof typeof jobsData])
}

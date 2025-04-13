import { NextResponse } from "next/server"

// Mock satellite data for different tickers
const satelliteData = {
  AAPL: {
    locations: [
      { name: "Apple Park, Cupertino", activity: 92, change: 5, coordinates: { lat: 37.3346, lng: -122.009 } },
      { name: "Apple Stores (US)", activity: 87, change: 12, coordinates: { lat: 40.7128, lng: -74.006 } },
      { name: "Manufacturing (China)", activity: 78, change: -3, coordinates: { lat: 22.5431, lng: 114.0579 } },
    ],
    metrics: {
      footTraffic: { value: 85, change: 8 },
      parkingOccupancy: { value: 82, change: 12 },
      deliveryActivity: { value: 76, change: 5 },
      constructionActivity: { value: 45, change: 0 },
    },
    analysis:
      "Satellite imagery shows increased foot traffic at Apple retail locations compared to the previous month. This correlates with the company's recent product launches and could indicate stronger-than-expected quarterly sales. Manufacturing facilities in Asia show slightly decreased activity, potentially indicating supply chain adjustments.",
    lastUpdated: "2023-12-15T08:30:00Z",
  },
  MSFT: {
    locations: [
      { name: "Microsoft HQ, Redmond", activity: 88, change: 3, coordinates: { lat: 47.674, lng: -122.1215 } },
      { name: "Data Centers (US)", activity: 95, change: 15, coordinates: { lat: 39.9526, lng: -75.1652 } },
      { name: "Office Locations (Global)", activity: 72, change: 8, coordinates: { lat: 51.5074, lng: -0.1278 } },
    ],
    metrics: {
      footTraffic: { value: 72, change: 5 },
      parkingOccupancy: { value: 75, change: 3 },
      deliveryActivity: { value: 82, change: 7 },
      constructionActivity: { value: 68, change: 12 },
    },
    analysis:
      "Satellite imagery of Microsoft's data centers shows significant increased activity, likely related to cloud infrastructure expansion. Corporate campuses show moderate increases in foot traffic as more employees return to office. Construction activity at several sites indicates continued infrastructure investment.",
    lastUpdated: "2023-12-14T09:15:00Z",
  },
  TSLA: {
    locations: [
      { name: "Fremont Factory", activity: 85, change: -5, coordinates: { lat: 37.4924, lng: -121.9465 } },
      { name: "Gigafactory Texas", activity: 92, change: 8, coordinates: { lat: 30.224, lng: -97.64 } },
      { name: "Gigafactory Shanghai", activity: 78, change: -10, coordinates: { lat: 31.2304, lng: 121.4737 } },
      { name: "Gigafactory Berlin", activity: 65, change: -15, coordinates: { lat: 52.52, lng: 13.405 } },
    ],
    metrics: {
      footTraffic: { value: 82, change: -3 },
      parkingOccupancy: { value: 85, change: -2 },
      deliveryActivity: { value: 75, change: -8 },
      constructionActivity: { value: 88, change: 5 },
    },
    analysis:
      "Satellite imagery reveals mixed activity across Tesla's manufacturing facilities. Gigafactory Texas shows increased activity, likely related to Cybertruck production ramp-up. However, Shanghai and Berlin facilities show decreased activity, potentially indicating production challenges or adjustments to demand forecasts. Delivery truck activity has decreased at multiple locations.",
    lastUpdated: "2023-12-13T10:45:00Z",
  },
  AMZN: {
    locations: [
      { name: "Fulfillment Centers (US)", activity: 95, change: 18, coordinates: { lat: 39.9526, lng: -75.1652 } },
      { name: "AWS Data Centers", activity: 92, change: 12, coordinates: { lat: 38.9072, lng: -77.0369 } },
      { name: "Corporate HQ, Seattle", activity: 78, change: 5, coordinates: { lat: 47.6062, lng: -122.3321 } },
    ],
    metrics: {
      footTraffic: { value: 65, change: 3 },
      parkingOccupancy: { value: 72, change: 5 },
      deliveryActivity: { value: 95, change: 22 },
      constructionActivity: { value: 85, change: 15 },
    },
    analysis:
      "Satellite imagery of Amazon's fulfillment network shows significantly increased activity, with delivery vehicle counts up 22% compared to last month. This suggests strong e-commerce demand heading into the holiday season. AWS data center activity also shows notable increases, indicating continued cloud infrastructure expansion.",
    lastUpdated: "2023-12-12T11:30:00Z",
  },
  WMT: {
    locations: [
      { name: "Supercenters (US)", activity: 88, change: 12, coordinates: { lat: 36.3728, lng: -94.2088 } },
      { name: "Distribution Centers", activity: 92, change: 15, coordinates: { lat: 39.9526, lng: -75.1652 } },
      { name: "International Stores", activity: 75, change: 5, coordinates: { lat: 19.4326, lng: -99.1332 } },
    ],
    metrics: {
      footTraffic: { value: 85, change: 12 },
      parkingOccupancy: { value: 88, change: 15 },
      deliveryActivity: { value: 92, change: 18 },
      constructionActivity: { value: 65, change: 3 },
    },
    analysis:
      "Satellite imagery shows increased parking lot activity at Walmart locations compared to the previous month. This correlates with the company's recent promotional events and could indicate stronger-than-expected quarterly sales. Distribution center activity has also increased significantly, suggesting inventory build-up for anticipated demand.",
    lastUpdated: "2023-12-11T12:15:00Z",
  },
}

export async function GET(request: Request, { params }: { params: { ticker: string } }) {
  const ticker = params.ticker.toUpperCase()

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (!satelliteData[ticker as keyof typeof satelliteData]) {
    return NextResponse.json({ error: "Ticker not found" }, { status: 404 })
  }

  return NextResponse.json(satelliteData[ticker as keyof typeof satelliteData])
}

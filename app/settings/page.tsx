import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-view">Default Dashboard View</Label>
                <select id="default-view" className="w-full p-2 border rounded-md">
                  <option value="overview">Overview</option>
                  <option value="sentiment">Sentiment Analysis</option>
                  <option value="satellite">Satellite Data</option>
                  <option value="jobs">Job Market</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-stocks">Default Stocks</Label>
                <input id="default-stocks" className="w-full p-2 border rounded-md" placeholder="AAPL, MSFT, GOOGL" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-refresh" />
                <Label htmlFor="auto-refresh">Auto-refresh data (every 5 minutes)</Label>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="price-alerts" />
                <Label htmlFor="price-alerts">Price Alerts</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="sentiment-alerts" />
                <Label htmlFor="sentiment-alerts">Sentiment Change Alerts</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="news-alerts" />
                <Label htmlFor="news-alerts">Breaking News Alerts</Label>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="flex">
                  <input
                    id="openai-key"
                    type="password"
                    className="flex-1 p-2 border rounded-l-md"
                    value="sk-••••••••••••••••••••••"
                  />
                  <Button variant="outline" className="rounded-l-none">
                    Show
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alpha-vantage">Alpha Vantage API Key</Label>
                <div className="flex">
                  <input
                    id="alpha-vantage"
                    type="password"
                    className="flex-1 p-2 border rounded-l-md"
                    value="AV••••••••••••••"
                  />
                  <Button variant="outline" className="rounded-l-none">
                    Show
                  </Button>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    Light
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Dark
                  </Button>
                  <Button variant="outline" className="flex-1">
                    System
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chart-color">Chart Color Scheme</Label>
                <select id="chart-color" className="w-full p-2 border rounded-md">
                  <option value="default">Default</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="colorblind">Colorblind Friendly</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="compact-view" />
                <Label htmlFor="compact-view">Compact View</Label>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

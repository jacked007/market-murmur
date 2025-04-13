"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  Globe,
  Package,
  Settings,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
  LineChart,
  Newspaper,
  LayoutDashboard,
  Layers,
  MessageSquare,
  BarChart,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useStore } from "@/lib/store"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { setSidebarOpen } = useStore()

  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    altData: false,
    sentiment: false,
    market: false,
  })

  // Initialize open state based on current path
  React.useEffect(() => {
    const newOpenGroups = { ...openGroups }

    if (
      pathname.includes("/satellite") ||
      pathname.includes("/shipping") ||
      pathname.includes("/app-traffic") ||
      pathname.includes("/jobs")
    ) {
      newOpenGroups.altData = true
    }

    if (pathname.includes("/sentiment") || pathname.includes("/news") || pathname.includes("/signals")) {
      newOpenGroups.sentiment = true
    }

    if (pathname.includes("/trends") || pathname.includes("/earnings")) {
      newOpenGroups.market = true
    }

    setOpenGroups(newOpenGroups)
  }, [pathname])

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === "/"} tooltip="Dashboard" onClick={() => handleNavigation("/")}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Alternative Data Group */}
            <Collapsible
              open={openGroups.altData}
              onOpenChange={() => toggleGroup("altData")}
              className="group/collapsible w-full"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Alternative Data">
                    <Layers className="h-4 w-4" />
                    <span>Alternative Data</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/satellite"}
                        onClick={() => handleNavigation("/satellite")}
                      >
                        <Globe className="h-4 w-4" />
                        <span>Satellite Data</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/shipping"}
                        onClick={() => handleNavigation("/shipping")}
                      >
                        <Package className="h-4 w-4" />
                        <span>Shipping Activity</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/app-traffic"}
                        onClick={() => handleNavigation("/app-traffic")}
                      >
                        <Smartphone className="h-4 w-4" />
                        <span>App Traffic</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive={pathname === "/jobs"} onClick={() => handleNavigation("/jobs")}>
                        <Users className="h-4 w-4" />
                        <span>Job Market</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Sentiment & News Group */}
            <Collapsible
              open={openGroups.sentiment}
              onOpenChange={() => toggleGroup("sentiment")}
              className="group/collapsible w-full"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Sentiment & News">
                    <MessageSquare className="h-4 w-4" />
                    <span>Sentiment & News</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/sentiment"}
                        onClick={() => handleNavigation("/sentiment")}
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Sentiment Analysis</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive={pathname === "/news"} onClick={() => handleNavigation("/news")}>
                        <Newspaper className="h-4 w-4" />
                        <span>News & Events</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/signals"}
                        onClick={() => handleNavigation("/signals")}
                      >
                        <Zap className="h-4 w-4" />
                        <span>Signal Sources</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Market Intelligence Group */}
            <Collapsible
              open={openGroups.market}
              onOpenChange={() => toggleGroup("market")}
              className="group/collapsible w-full"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Market Intelligence">
                    <BarChart className="h-4 w-4" />
                    <span>Market Intelligence</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/trends"}
                        onClick={() => handleNavigation("/trends")}
                      >
                        <LineChart className="h-4 w-4" />
                        <span>Market Trends</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={pathname === "/earnings"}
                        onClick={() => handleNavigation("/earnings")}
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span>Earnings Calls</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/settings"}
                tooltip="Settings"
                onClick={() => handleNavigation("/settings")}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

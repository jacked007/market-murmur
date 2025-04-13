import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StoreState {
  selectedTicker: string
  setSelectedTicker: (ticker: string) => void
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedTicker: "AAPL",
      setSelectedTicker: (ticker: string) => set({ selectedTicker: ticker }),
      dateRange: {
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
      },
      setDateRange: (range) => set({ dateRange: range }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: "dashboard-store",
    },
  ),
)

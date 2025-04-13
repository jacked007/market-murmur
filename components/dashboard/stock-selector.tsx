"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const stocks = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "MSFT", label: "Microsoft Corporation" },
  { value: "GOOGL", label: "Alphabet Inc." },
  { value: "AMZN", label: "Amazon.com, Inc." },
  { value: "META", label: "Meta Platforms, Inc." },
  { value: "TSLA", label: "Tesla, Inc." },
  { value: "NVDA", label: "NVIDIA Corporation" },
  { value: "JPM", label: "JPMorgan Chase & Co." },
  { value: "V", label: "Visa Inc." },
  { value: "WMT", label: "Walmart Inc." },
]

interface StockSelectorProps {
  selectedStocks: string[]
  onStocksChange: (stocks: string[]) => void
}

export function StockSelector({ selectedStocks, onStocksChange }: StockSelectorProps) {
  const [open, setOpen] = React.useState(false)

  const toggleStock = (value: string) => {
    if (selectedStocks.includes(value)) {
      onStocksChange(selectedStocks.filter((stock) => stock !== value))
    } else {
      onStocksChange([...selectedStocks, value])
    }
  }

  const removeStock = (value: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onStocksChange(selectedStocks.filter((stock) => stock !== value))
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
            Select stocks
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search stocks..." />
            <CommandList>
              <CommandEmpty>No stock found.</CommandEmpty>
              <CommandGroup>
                {stocks.map((stock) => (
                  <CommandItem key={stock.value} value={stock.value} onSelect={() => toggleStock(stock.value)}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedStocks.includes(stock.value) ? "opacity-100" : "opacity-0")}
                    />
                    {stock.value} - {stock.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2">
        {selectedStocks.map((stock) => {
          const stockInfo = stocks.find((s) => s.value === stock)
          return (
            <Badge key={stock} variant="secondary">
              {stock} {stockInfo && `- ${stockInfo.label}`}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={(e) => removeStock(stock, e)}
              >
                ×
              </button>
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

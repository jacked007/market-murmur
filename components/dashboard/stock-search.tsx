"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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

export function StockSearch() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full sm:w-[200px] justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            {value ? stocks.find((stock) => stock.value === value)?.label : "Search stocks..."}
          </div>
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
                <CommandItem
                  key={stock.value}
                  value={stock.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === stock.value ? "opacity-100" : "opacity-0")} />
                  {stock.value} - {stock.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

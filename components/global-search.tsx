"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchResult {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

export function GlobalSearch() {
  const { setSelectedTicker } = useStore()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 1) {
      setResults([])
      return
    }

    const searchSymbols = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/stock/search?q=${encodeURIComponent(debouncedQuery)}`)

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`)
        }

        const data = await response.json()
        setResults(data.result || [])
      } catch (error) {
        console.error("Error searching symbols:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    searchSymbols()
  }, [debouncedQuery])

  const handleSelect = (symbol: string) => {
    setSelectedTicker(symbol)
    setOpen(false)
    setQuery("")
  }

  return (
    <>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search stocks... (⌘K)"
          className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          onClick={() => setOpen(true)}
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for stocks..." value={query} onValueChange={setQuery} />
        <CommandList>
          {isLoading ? (
            <div className="py-6 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Searching stocks...</p>
            </div>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Stocks">
                  {results.map((result) => (
                    <CommandItem key={result.symbol} onSelect={() => handleSelect(result.symbol)}>
                      <div className="flex flex-col">
                        <span className="font-medium">{result.symbol}</span>
                        <span className="text-xs text-muted-foreground">{result.description}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

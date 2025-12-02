"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchHeroProps {
  onSearch?: (query: string) => void
}

export function SearchHero({ onSearch }: SearchHeroProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* Heading */}
      <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
        Level up your{" "}
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">skills</span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-xl text-lg text-muted-foreground">
        Explore top courses and manage your personal knowledge base.
      </p>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur" />
        <div className="relative flex items-center rounded-full border border-border bg-card shadow-xl">
          <Search className="ml-5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="flex-1 border-0 bg-transparent px-4 py-6 text-base focus-visible:ring-0"
          />
          <Button className="mr-2 rounded-full px-6">Search</Button>
        </div>
      </div>
    </div>
  )
}

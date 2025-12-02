"use client"

import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "./status-badge"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  showSearch?: boolean
  currentPage?: {
    label: string
    type?: "note" | "quiz" | "document"
  }
}

export function Header({ breadcrumbs = [], showSearch = true, currentPage }: HeaderProps) {
  return (
    <header className="fixed left-16 right-0 top-0 z-40 flex h-12 items-center justify-between pointer-events-none">
      {/* Left - Breadcrumbs with rounded corner */}
      <div className="h-12 flex items-center bg-background/80 rounded-br-[4rem] border-b border-r border-border backdrop-blur-sm pointer-events-auto pr-6">
        <div className="flex items-center gap-2 px-4">
          <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Nexera
          </Link>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">{item.label}</span>
              )}
            </div>
          ))}
          {currentPage && (
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground font-medium">{currentPage.label}</span>
              {currentPage.type && (
                <StatusBadge
                  variant={currentPage.type === "note" ? "info" : currentPage.type === "quiz" ? "success" : "warning"}
                  size="sm"
                >
                  {currentPage.type.charAt(0).toUpperCase() + currentPage.type.slice(1)}
                </StatusBadge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right - Search & Badges with rounded corner */}
      <div className="h-12 flex items-center bg-background/80 rounded-bl-[4rem] border-b border-l border-border backdrop-blur-sm pointer-events-auto pl-6">
        <div className="flex items-center gap-3 pr-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-8 w-80 rounded-bl-full border-border bg-secondary/50 pl-12 text-sm placeholder:text-muted-foreground focus:bg-secondary"
              />
            </div>
          )}
          <StatusBadge variant="success">Seeker</StatusBadge>
          <StatusBadge variant="warning">NexPrime</StatusBadge>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 ring-2 ring-background cursor-pointer hover:ring-primary/50 transition-all" />
        </div>
      </div>
    </header>
  )
}

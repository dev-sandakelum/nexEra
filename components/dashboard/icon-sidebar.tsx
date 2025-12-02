"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, FileText, HelpCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "home", icon: Home, href: "/dashboard" },
  { id: "notes", icon: BookOpen, href: "/dashboard/notes" },
  { id: "files", icon: FileText, href: "/dashboard/files" },
]

export function IconSidebar() {
  const pathname = usePathname()

  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname === "/dashboard") return "home"
    if (pathname.startsWith("/dashboard/notes")) return "notes"
    if (pathname.startsWith("/dashboard/files")) return "files"
    return "home"
  }

  const activeItem = getActiveItem()

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center border-r border-border bg-background py-4">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/20 transition-transform hover:scale-105"
      >
        <Sparkles className="h-5 w-5 text-white" />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 ring-2 ring-background cursor-pointer hover:ring-primary/50 transition-all" />
      </div>
    </aside>
  )
}

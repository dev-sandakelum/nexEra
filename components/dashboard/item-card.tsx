"use client"

import { BookOpen, HelpCircle, File } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { cn } from "@/lib/utils"

interface ItemCardProps {
  title: string
  type: "note" | "quiz" | "document"
  status?: "completed" | "finalized" | "in-progress"
  subtitle?: string
  href?: string
  className?: string
}

const iconMap = {
  note: BookOpen,
  quiz: HelpCircle,
  document: File,
}

const typeColors = {
  note: "bg-blue-500/20",
  quiz: "bg-emerald-500/20",
  document: "bg-orange-500/20",
}

export function ItemCard({ title, type, status, subtitle, href, className }: ItemCardProps) {
  const Icon = iconMap[type]

  return (
    <a
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl bg-card p-2 transition-all duration-200 hover:bg-secondary",
        className,
      )}
    >
      {/* Icon */}
      <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", typeColors[type])}>
        <Icon className="h-6 w-6 text-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="truncate text-sm font-medium text-foreground">{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Status */}
      {status && (
        <div className="flex flex-col items-end gap-1">
          <StatusBadge
            variant={status === "completed" ? "success" : status === "finalized" ? "warning" : "default"}
            size="sm"
          >
            {status === "completed" ? "Completed" : status === "finalized" ? "Finalized" : "In Progress"}
          </StatusBadge>
          {subtitle && <span className="text-[10px] text-muted-foreground">{subtitle}</span>}
        </div>
      )}
    </a>
  )
}

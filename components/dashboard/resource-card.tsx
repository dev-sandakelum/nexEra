"use client"

import { FileText, BookOpen, HelpCircle, Sparkles, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResourceCardProps {
  title: string
  subtitle: string
  icon: "notes" | "quiz" | "pdf" | "ai"
  href?: string
  className?: string
}

const iconMap: Record<string, { icon: LucideIcon; gradient: string }> = {
  notes: { icon: BookOpen, gradient: "from-blue-500 to-cyan-400" },
  quiz: { icon: HelpCircle, gradient: "from-emerald-500 to-teal-400" },
  pdf: { icon: FileText, gradient: "from-orange-500 to-amber-400" },
  ai: { icon: Sparkles, gradient: "from-purple-500 to-pink-400" },
}

export function ResourceCard({ title, subtitle, icon, href, className }: ResourceCardProps) {
  const { icon: Icon, gradient } = iconMap[icon]

  return (
    <a
      href={href}
      className={cn(
        "group relative flex h-72 w-60 flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        className,
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
          gradient,
        )}
      >
        <Icon className="h-10 w-10 text-white" />
      </div>

      {/* Title */}
      <h3 className="mb-2 font-mono text-xl font-bold text-foreground">{title}</h3>

      {/* Subtitle */}
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{subtitle}</p>
    </a>
  )
}

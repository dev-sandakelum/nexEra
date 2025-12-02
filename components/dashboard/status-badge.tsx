import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  variant?: "success" | "warning" | "info" | "default"
  size?: "sm" | "md"
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  success: "bg-[var(--status-green-bg)] text-[var(--status-green)] border-[var(--status-green)]",
  warning: "bg-[var(--status-amber-bg)] text-[var(--status-amber)] border-[var(--status-amber)]",
  info: "bg-[var(--status-cyan-bg)] text-[var(--status-cyan)] border-[var(--status-cyan)]",
  default: "bg-secondary text-secondary-foreground border-border",
}

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
}

export function StatusBadge({ variant = "default", size = "md", children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  )
}

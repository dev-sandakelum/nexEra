"use client"

import { cn } from "@/lib/utils"

interface SidebarSection {
  title: string
  items: {
    label: string
    active?: boolean
    onClick?: () => void
  }[]
}

interface ContentSidebarProps {
  title: string
  sections: SidebarSection[]
}

export function ContentSidebar({ title, sections }: ContentSidebarProps) {
  return (
    <aside className="flex left-16 top-12 z-30 flex h-[calc(100vh-48px)] w-64 flex-col border-r border-border bg-card/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{section.title}</h3>
              <div className="space-y-0.5">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
                      item.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

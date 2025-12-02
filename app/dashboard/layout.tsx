import type React from "react"
import { IconSidebar } from "@/components/dashboard/icon-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PageTransition } from "@/components/dashboard/page-transition"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background" >
      {/* Static sidebar - never re-renders on navigation */}
      <IconSidebar activeItem="home" />

      {/* Dynamic header - updates breadcrumbs based on route */}
      <DashboardHeader />

      {/* Main content area with page transitions */}
      <main className="ml-16 pt-12">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}

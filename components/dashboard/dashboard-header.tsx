"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Header } from "./header"
import { Suspense } from "react"

const routeConfig: Record<string, { breadcrumbs: { label: string; href?: string }[]; showSearch: boolean }> = {
  "/dashboard": {
    breadcrumbs: [],
    showSearch: true,
  },
  "/dashboard/notes": {
    breadcrumbs: [{ label: "Notes", href: "/dashboard/notes" }],
    showSearch: true,
  },
  "/dashboard/files": {
    breadcrumbs: [{ label: "Files", href: "/dashboard/files" }],
    showSearch: true,
  },
}

const subjectLabels: Record<string, string> = {
  "c-programming": "C Programming",
  "information-system": "Information System",
  networking: "Networking",
  maths: "Maths",
  test: "Test",
  "test-2": "Test 2",
}

function DashboardHeaderContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const config = routeConfig[pathname] || routeConfig["/dashboard"]

  // Get current page info based on route
  let currentPage: { label: string; type?: "note" | "quiz" | "document" } | undefined

  if (pathname === "/dashboard/notes") {
    const subject = searchParams.get("subject")
    if (subject && subjectLabels[subject]) {
      currentPage = { label: subjectLabels[subject] }
    }
  }

  return <Header breadcrumbs={config.breadcrumbs} showSearch={config.showSearch} currentPage={currentPage} />
}

export function DashboardHeader() {
  return (
    <Suspense fallback={<Header breadcrumbs={[]} showSearch={true} />}>
      <DashboardHeaderContent />
    </Suspense>
  )
}

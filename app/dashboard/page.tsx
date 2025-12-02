import { SearchHero } from "@/components/dashboard/search-hero"
import { ResourceCard } from "@/components/dashboard/resource-card"

const resources = [
  { title: "Short Notes", subtitle: "6 COLLECTIONS", icon: "notes" as const },
  { title: "Quizzes", subtitle: "RESOURCE", icon: "quiz" as const },
  { title: "PDFs", subtitle: "RESOURCE", icon: "pdf" as const },
  { title: "Q Gen", subtitle: "RESOURCE", icon: "ai" as const },
]

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-8 py-16">
      {/* Hero Section */}
      <div className="mb-20">
        <SearchHero />
      </div>

      {/* Resource Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.title}
            title={resource.title}
            subtitle={resource.subtitle}
            icon={resource.icon}
            href={resource.icon === "notes" ? "/dashboard/notes" : undefined}
          />
        ))}
      </div>
    </div>
  )
}

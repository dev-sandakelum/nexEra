"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { ContentSidebar } from "@/components/dashboard/content-sidebar"
import { SectionHeader } from "@/components/dashboard/section-header"
import { ItemCard } from "@/components/dashboard/item-card"
import { Suspense } from "react"

const subjects = [
  { id: "c-programming", label: "C Programming" },
  { id: "information-system", label: "Information System" },
  { id: "networking", label: "Networking" },
  { id: "maths", label: "Maths" },
  { id: "test", label: "Test" },
  { id: "test-2", label: "Test 2" },
]

const notesData: Record<string, { notes: any[]; quizzes: any[]; documents: any[] }> = {
  "information-system": {
    notes: [
      { id: 1, title: "IS full note", status: "finalized" },
      { id: 2, title: "IS note get", status: "finalized" },
      { id: 3, title: "IS note by s" },
    ],
    quizzes: [
      { id: 1, title: "IS Quiz 01", status: "completed", questions: 50 },
      { id: 2, title: "IS Quiz 1.6", status: "completed", questions: 50 },
      { id: 3, title: "IS Quiz CF", questions: 50 },
    ],
    documents: [
      { id: 1, title: "PDF: IS_04&06" },
      { id: 2, title: "PDF: IS_model paper 03 final" },
      { id: 3, title: "PDF: IS_05" },
    ],
  },
  "c-programming": {
    notes: [
      { id: 1, title: "C Programming Basics" },
      { id: 2, title: "Pointers & Memory" },
    ],
    quizzes: [{ id: 1, title: "C Quiz 01", status: "completed", questions: 30 }],
    documents: [{ id: 1, title: "PDF: C_lecture_notes" }],
  },
}

function NotesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentSubject = searchParams.get("subject") || "information-system"
  const data = notesData[currentSubject] || { notes: [], quizzes: [], documents: [] }

  const handleSubjectChange = (subjectId: string) => {
    router.push(`/dashboard/notes?subject=${subjectId}`, { scroll: false })
  }

  const sidebarSections = [
    {
      title: "Subjects",
      items: subjects.map((subject) => ({
        label: subject.label,
        active: subject.id === currentSubject,
        onClick: () => handleSubjectChange(subject.id),
      })),
    },
  ]

  return (
    <div className="flex">
      <ContentSidebar title="Subjects" sections={sidebarSections} />

      <div className="ml-8 flex-1 p-8">
        {/* Description */}
        <p className="mb-8 text-sm text-muted-foreground">
          Retailers have established special Web sites for users of mobile devices
        </p>

        {/* Notes Section */}
        <section className="mb-10">
          <SectionHeader title="Notes" />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.notes.map((note) => (
              <ItemCard key={note.id} title={note.title} type="note" status={note.status} />
            ))}
          </div>
        </section>

        {/* Quizzes Section */}
        <section className="mb-10">
          <SectionHeader
            title="Quizzes"
            description="Retailers have established special Web sites for users of mobile devices"
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.quizzes.map((quiz) => (
              <ItemCard
                key={quiz.id}
                title={quiz.title}
                type="quiz"
                status={quiz.status}
                subtitle={quiz.questions ? `${quiz.questions} questions` : undefined}
              />
            ))}
          </div>
        </section>

        {/* Documents Section */}
        <section>
          <SectionHeader
            title="Documents"
            description="Retailers have established special Web sites for users of mobile devices"
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.documents.map((doc) => (
              <ItemCard key={doc.id} title={doc.title} type="document" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <NotesContent />
    </Suspense>
  )
}

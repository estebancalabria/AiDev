import { DashboardShell } from "@/components/dashboard-shell"
import { KanbanBoard } from "@/components/kanban-board"

export default function BoardPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <KanbanBoard projectId={params.id} />
    </DashboardShell>
  )
}

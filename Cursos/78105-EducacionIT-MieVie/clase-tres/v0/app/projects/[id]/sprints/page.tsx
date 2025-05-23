import { DashboardShell } from "@/components/dashboard-shell"
import { SprintPlanning } from "@/components/sprint-planning"

export default function SprintsPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <SprintPlanning projectId={params.id} />
    </DashboardShell>
  )
}

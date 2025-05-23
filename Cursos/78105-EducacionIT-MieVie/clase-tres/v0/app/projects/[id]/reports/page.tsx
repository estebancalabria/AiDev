import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectReports } from "@/components/project-reports"

export default function ReportsPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <ProjectReports projectId={params.id} />
    </DashboardShell>
  )
}

import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectDetails } from "@/components/project-details"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <DashboardShell>
      <ProjectDetails id={params.id} />
    </DashboardShell>
  )
}

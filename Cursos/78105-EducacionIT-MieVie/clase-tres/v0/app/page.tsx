import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectOverview } from "@/components/project-overview"

export default function Home() {
  return (
    <DashboardShell>
      <ProjectOverview />
    </DashboardShell>
  )
}

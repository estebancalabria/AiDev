"use client"

import { useProject } from "../contexts/ProjectContext"
import PageEditor from "./PageEditor"
import ListView from "./ListView"
import KanbanView from "./KanbanView"
import Toolbar from "./Toolbar"

interface MainContentProps {
  sidebarCollapsed: boolean
}

export default function MainContent({ sidebarCollapsed }: MainContentProps) {
  const { state } = useProject()

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Toolbar />

      <div className="flex-1 overflow-hidden">
        {state.currentPageId ? <PageEditor /> : state.viewMode === "list" ? <ListView /> : <KanbanView />}
      </div>
    </div>
  )
}

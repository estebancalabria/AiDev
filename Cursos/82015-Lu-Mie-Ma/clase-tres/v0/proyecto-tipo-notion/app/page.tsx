"use client"

import { useState } from "react"
import { ProjectProvider } from "./contexts/ProjectContext"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <ProjectProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <MainContent sidebarCollapsed={sidebarCollapsed} />
        <Toaster />
      </div>
    </ProjectProvider>
  )
}

"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Plus, FileText, Menu, X, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProject, type Page } from "../contexts/ProjectContext"
import { cn } from "@/lib/utils"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { state, dispatch, addPage } = useProject()
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set(["1"]))

  const toggleExpanded = (pageId: string) => {
    const newExpanded = new Set(expandedPages)
    if (newExpanded.has(pageId)) {
      newExpanded.delete(pageId)
    } else {
      newExpanded.add(pageId)
    }
    setExpandedPages(newExpanded)
  }

  const handleAddPage = (parentId?: string) => {
    const newPage = {
      title: "Nueva Página",
      parentId,
      blocks: [
        {
          id: Date.now().toString(),
          type: "text" as const,
          content: "Comienza a escribir...",
        },
      ],
      properties: {
        status: "todo" as const,
        priority: "medium" as const,
        assignee: "",
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }
    addPage(newPage)
  }

  const handlePageClick = (pageId: string) => {
    if (pageId === state.currentPageId) {
      // Si hacemos click en la página actual, volvemos a la vista principal
      dispatch({ type: "SET_CURRENT_PAGE", payload: null })
    } else {
      dispatch({ type: "SET_CURRENT_PAGE", payload: pageId })
    }
  }

  const renderPageTree = (pages: Page[], level = 0) => {
    const rootPages = pages.filter((page) => (level === 0 ? !page.parentId : page.parentId === pages[0]?.id))

    return rootPages.map((page) => {
      const childPages = state.pages.filter((p) => p.parentId === page.id)
      const hasChildren = childPages.length > 0
      const isExpanded = expandedPages.has(page.id)
      const isSelected = state.currentPageId === page.id

      return (
        <div key={page.id}>
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100 group",
              isSelected && "bg-blue-50 text-blue-700",
              collapsed && "justify-center",
            )}
            style={{ paddingLeft: collapsed ? "8px" : `${8 + level * 16}px` }}
            onClick={() => handlePageClick(page.id)}
          >
            {hasChildren && !collapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpanded(page.id)
                }}
              >
                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </Button>
            )}
            {!hasChildren && !collapsed && <div className="w-4" />}

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileText className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate text-sm">{page.title}</span>}
            </div>

            {!collapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddPage(page.id)
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}
          </div>

          {hasChildren && isExpanded && !collapsed && <div>{renderPageTree(childPages, level + 1)}</div>}
        </div>
      )
    })
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && <h1 className="font-semibold text-gray-900">Proyectos</h1>}
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Add new page button */}
      <div className="p-2 space-y-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "SET_CURRENT_PAGE", payload: null })}
          className={cn(
            "w-full justify-start gap-2",
            collapsed && "justify-center",
            !state.currentPageId && "bg-blue-50 text-blue-700",
          )}
        >
          <LayoutList className="h-4 w-4" />
          {!collapsed && "Inicio"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAddPage()}
          className={cn("w-full justify-start gap-2", collapsed && "justify-center")}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && "Nueva Página"}
        </Button>
      </div>

      {/* Page tree */}
      <div className="flex-1 overflow-y-auto p-2">{renderPageTree(state.pages)}</div>
    </div>
  )
}

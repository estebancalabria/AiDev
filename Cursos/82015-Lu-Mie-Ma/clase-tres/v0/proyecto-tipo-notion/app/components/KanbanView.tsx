"use client"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { FileText, User, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useProject, type Page } from "../contexts/ProjectContext"
import { cn } from "@/lib/utils"

const statusLabels = {
  todo: "Por hacer",
  "in-progress": "En progreso",
  done: "Completado",
}

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const priorityLabels = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
}

export default function KanbanView() {
  const { getFilteredPages, updatePage, dispatch } = useProject()
  const pages = getFilteredPages()

  const columns = {
    todo: pages.filter((page) => page.properties.status === "todo"),
    "in-progress": pages.filter((page) => page.properties.status === "in-progress"),
    done: pages.filter((page) => page.properties.status === "done"),
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId === destination.droppableId) return

    const page = pages.find((p) => p.id === draggableId)
    if (!page) return

    const newStatus = destination.droppableId as "todo" | "in-progress" | "done"
    updatePage({
      ...page,
      properties: {
        ...page.properties,
        status: newStatus,
      },
    })
  }

  const handlePageClick = (pageId: string) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageId })
  }

  const renderCard = (page: Page, index: number) => (
    <Draggable key={page.id} draggableId={page.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-white rounded-lg border border-gray-200 p-3 mb-3 cursor-pointer hover:shadow-md transition-shadow",
            snapshot.isDragging && "shadow-lg",
          )}
          onClick={() => handlePageClick(page.id)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{page.title}</h4>
            </div>
            <Badge className={cn("text-xs", priorityColors[page.properties.priority])}>
              {priorityLabels[page.properties.priority]}
            </Badge>
          </div>

          {page.blocks.length > 0 && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{page.blocks[0].content}</p>
          )}

          <div className="flex items-center justify-between">
            {page.properties.assignee && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">{page.properties.assignee}</span>
              </div>
            )}

            {page.properties.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">{page.properties.tags.length}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-x-auto overflow-y-auto p-6 pb-20">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 min-w-max">
            {Object.entries(columns).map(([status, statusPages]) => (
              <div key={status} className="w-80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">{statusLabels[status as keyof typeof statusLabels]}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {statusPages.length}
                  </Badge>
                </div>

                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "min-h-[200px] rounded-lg p-3 transition-colors",
                        snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50",
                      )}
                    >
                      {statusPages.map((page, index) => renderCard(page, index))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

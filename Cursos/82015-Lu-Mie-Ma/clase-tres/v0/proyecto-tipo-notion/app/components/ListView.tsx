"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { FileText, User, Calendar, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useProject } from "../contexts/ProjectContext"
import { cn } from "@/lib/utils"

const statusColors = {
  todo: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
}

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const statusLabels = {
  todo: "Por hacer",
  "in-progress": "En progreso",
  done: "Completado",
}

const priorityLabels = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
}

export default function ListView() {
  const { getFilteredPages, dispatch } = useProject()
  const pages = getFilteredPages()

  const handlePageClick = (pageId: string) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageId })
  }

  if (pages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay páginas</h3>
          <p className="text-gray-500">Crea tu primera página para comenzar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 pb-20">
        <div className="space-y-4">
          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePageClick(page.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <h3 className="font-medium text-gray-900">{page.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-xs", statusColors[page.properties.status])}>
                    {statusLabels[page.properties.status]}
                  </Badge>
                  <Badge className={cn("text-xs", priorityColors[page.properties.priority])}>
                    {priorityLabels[page.properties.priority]}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                {page.properties.assignee && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{page.properties.assignee}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Actualizado{" "}
                    {formatDistanceToNow(new Date(page.properties.updatedAt), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                </div>
              </div>

              {page.properties.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex gap-1 flex-wrap">
                    {page.properties.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {page.blocks.length > 0 && (
                <div className="text-sm text-gray-600 line-clamp-2">{page.blocks[0].content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

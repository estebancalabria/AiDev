"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, GripVertical, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useProject, type Block, type Page } from "../contexts/ProjectContext"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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

export default function PageEditor() {
  const { state, updatePage, deletePage } = useProject()
  const { toast } = useToast()
  const [page, setPage] = useState<Page | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const currentPage = state.pages.find((p) => p.id === state.currentPageId)

  useEffect(() => {
    if (currentPage) {
      setPage({ ...currentPage })
      setHasUnsavedChanges(false)
    }
  }, [currentPage])

  // Auto-save functionality
  const debouncedSave = useCallback(
    debounce((pageToSave: Page) => {
      updatePage(pageToSave)
      setHasUnsavedChanges(false)
      toast({
        title: "Guardado automático",
        description: "Los cambios se han guardado automáticamente",
      })
    }, 1000),
    [updatePage, toast],
  )

  useEffect(() => {
    if (page && hasUnsavedChanges) {
      debouncedSave(page)
    }
  }, [page, hasUnsavedChanges, debouncedSave])

  if (!page) return null

  const handleTitleChange = (title: string) => {
    setPage({ ...page, title })
    setHasUnsavedChanges(true)
  }

  const handlePropertyChange = (key: string, value: any) => {
    setPage({
      ...page,
      properties: {
        ...page.properties,
        [key]: value,
      },
    })
    setHasUnsavedChanges(true)
  }

  const handleBlockChange = (blockId: string, updates: Partial<Block>) => {
    setPage({
      ...page,
      blocks: page.blocks.map((block) => (block.id === blockId ? { ...block, ...updates } : block)),
    })
    setHasUnsavedChanges(true)
  }

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: type === "heading" ? "Nuevo encabezado" : "Nuevo contenido",
      ...(type === "heading" && { level: 1 }),
      ...(type === "checklist" && { items: [] }),
    }
    setPage({
      ...page,
      blocks: [...page.blocks, newBlock],
    })
    setHasUnsavedChanges(true)
  }

  const deleteBlock = (blockId: string) => {
    setPage({
      ...page,
      blocks: page.blocks.filter((block) => block.id !== blockId),
    })
    setHasUnsavedChanges(true)
  }

  const addChecklistItem = (blockId: string) => {
    const newItem = {
      id: Date.now().toString(),
      text: "Nueva tarea",
      checked: false,
    }
    handleBlockChange(blockId, {
      items: [...(page.blocks.find((b) => b.id === blockId)?.items || []), newItem],
    })
  }

  const updateChecklistItem = (blockId: string, itemId: string, updates: { text?: string; checked?: boolean }) => {
    const block = page.blocks.find((b) => b.id === blockId)
    if (!block?.items) return

    const updatedItems = block.items.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    handleBlockChange(blockId, { items: updatedItems })
  }

  const deleteChecklistItem = (blockId: string, itemId: string) => {
    const block = page.blocks.find((b) => b.id === blockId)
    if (!block?.items) return

    const updatedItems = block.items.filter((item) => item.id !== itemId)
    handleBlockChange(blockId, { items: updatedItems })
  }

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    handlePropertyChange("tags", tags)
  }

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "heading":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Select
                value={block.level?.toString() || "1"}
                onValueChange={(value) => handleBlockChange(block.id, { level: Number.parseInt(value) })}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              value={block.content}
              onChange={(e) => handleBlockChange(block.id, { content: e.target.value })}
              className={cn(
                "border-none shadow-none text-lg font-semibold",
                block.level === 1 && "text-2xl",
                block.level === 2 && "text-xl",
                block.level === 3 && "text-lg",
              )}
              placeholder="Título del encabezado"
            />
          </div>
        )

      case "text":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => handleBlockChange(block.id, { content: e.target.value })}
            className="border-none shadow-none resize-none min-h-[100px]"
            placeholder="Escribe tu contenido aquí..."
          />
        )

      case "list":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => handleBlockChange(block.id, { content: e.target.value })}
            className="border-none shadow-none resize-none min-h-[100px]"
            placeholder="• Elemento de lista 1&#10;• Elemento de lista 2&#10;• Elemento de lista 3"
          />
        )

      case "checklist":
        return (
          <div className="space-y-2">
            {block.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={(checked) => updateChecklistItem(block.id, item.id, { checked: !!checked })}
                />
                <Input
                  value={item.text}
                  onChange={(e) => updateChecklistItem(block.id, item.id, { text: e.target.value })}
                  className="border-none shadow-none flex-1"
                  placeholder="Tarea"
                />
                <Button variant="ghost" size="sm" onClick={() => deleteChecklistItem(block.id, item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addChecklistItem(block.id)} className="text-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Agregar elemento
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 pb-20">
          {/* Page Header */}
          <div className="mb-6">
            <Input
              value={page.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-3xl font-bold border-none shadow-none p-0 mb-4"
              placeholder="Título de la página"
            />

            {/* Properties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Estado</label>
                <Select value={page.properties.status} onValueChange={(value) => handlePropertyChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Por hacer</SelectItem>
                    <SelectItem value="in-progress">En progreso</SelectItem>
                    <SelectItem value="done">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Prioridad</label>
                <Select
                  value={page.properties.priority}
                  onValueChange={(value) => handlePropertyChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Responsable</label>
                <Input
                  value={page.properties.assignee}
                  onChange={(e) => handlePropertyChange("assignee", e.target.value)}
                  placeholder="Asignar a..."
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Etiquetas</label>
                <Input
                  value={page.properties.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="etiqueta1, etiqueta2, etiqueta3"
                />
                <div className="flex gap-1 mt-2 flex-wrap">
                  {page.properties.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-4">
            {page.blocks.map((block) => (
              <div key={block.id} className="group relative">
                <div className="flex items-start gap-2">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBlock(block.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">{renderBlock(block)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Block Buttons */}
          <div className="mt-8 flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => addBlock("text")}>
              <Plus className="h-4 w-4 mr-2" />
              Texto
            </Button>
            <Button variant="outline" size="sm" onClick={() => addBlock("heading")}>
              <Plus className="h-4 w-4 mr-2" />
              Encabezado
            </Button>
            <Button variant="outline" size="sm" onClick={() => addBlock("list")}>
              <Plus className="h-4 w-4 mr-2" />
              Lista
            </Button>
            <Button variant="outline" size="sm" onClick={() => addBlock("checklist")}>
              <Plus className="h-4 w-4 mr-2" />
              Checklist
            </Button>
          </div>

          {/* Save Status */}
          {hasUnsavedChanges && (
            <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
              <Save className="h-4 w-4" />
              Guardando...
            </div>
          )}

          {/* Delete Page Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("¿Estás seguro de que quieres eliminar esta página?")) {
                  deletePage(page.id)
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar página
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

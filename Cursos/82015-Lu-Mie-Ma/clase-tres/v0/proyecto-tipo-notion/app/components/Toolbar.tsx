"use client"

import { Search, Filter, LayoutList, Kanban, SortAsc, SortDesc, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useProject } from "../contexts/ProjectContext"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Toolbar() {
  const { state, dispatch } = useProject()
  const [showFilters, setShowFilters] = useState(false)
  const isEditingPage = !!state.currentPageId

  const handleSearchChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: value })
  }

  const handleFilterChange = (key: string, value: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        ...state.filters,
        [key]: value || undefined,
      },
    })
  }

  const clearFilters = () => {
    dispatch({ type: "SET_FILTERS", payload: {} })
  }

  const activeFiltersCount = Object.values(state.filters).filter(Boolean).length

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-4 mb-4">
        {isEditingPage && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch({ type: "SET_CURRENT_PAGE", payload: null })}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        )}

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar páginas..."
            value={state.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={state.viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "list" })}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={state.viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "kanban" })}
          >
            <Kanban className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className="p-2 space-y-2">
              <Select
                value={state.filters.status || "all"}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="todo">Por hacer</SelectItem>
                  <SelectItem value="in-progress">En progreso</SelectItem>
                  <SelectItem value="done">Completado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={state.filters.priority || "all"}
                onValueChange={(value) => handleFilterChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las prioridades</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters}>Limpiar filtros</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {state.sortOrder === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
              Ordenar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: { sortBy: "title", sortOrder: state.sortOrder },
                })
              }
            >
              Título
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: { sortBy: "updatedAt", sortOrder: state.sortOrder },
                })
              }
            >
              Última modificación
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: { sortBy: "createdAt", sortOrder: state.sortOrder },
                })
              }
            >
              Fecha de creación
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: { sortBy: "priority", sortOrder: state.sortOrder },
                })
              }
            >
              Prioridad
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                dispatch({
                  type: "SET_SORT",
                  payload: { sortBy: state.sortBy, sortOrder: state.sortOrder === "asc" ? "desc" : "asc" },
                })
              }
            >
              {state.sortOrder === "asc" ? "Descendente" : "Ascendente"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

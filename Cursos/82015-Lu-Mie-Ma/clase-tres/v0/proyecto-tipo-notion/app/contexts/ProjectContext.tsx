"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface Block {
  id: string
  type: "text" | "heading" | "list" | "checklist"
  content: string
  items?: { id: string; text: string; checked?: boolean }[]
  level?: number
}

export interface Page {
  id: string
  title: string
  parentId?: string
  blocks: Block[]
  properties: {
    status: "todo" | "in-progress" | "done"
    priority: "low" | "medium" | "high"
    assignee: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
}

interface ProjectState {
  pages: Page[]
  currentPageId: string | null
  viewMode: "list" | "kanban"
  searchQuery: string
  filters: {
    status?: string
    priority?: string
    assignee?: string
    tags?: string[]
  }
  sortBy: "title" | "createdAt" | "updatedAt" | "priority"
  sortOrder: "asc" | "desc"
}

type ProjectAction =
  | { type: "SET_PAGES"; payload: Page[] }
  | { type: "ADD_PAGE"; payload: Page }
  | { type: "UPDATE_PAGE"; payload: Page }
  | { type: "DELETE_PAGE"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: string | null }
  | { type: "SET_VIEW_MODE"; payload: "list" | "kanban" }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_FILTERS"; payload: ProjectState["filters"] }
  | { type: "SET_SORT"; payload: { sortBy: ProjectState["sortBy"]; sortOrder: ProjectState["sortOrder"] } }

const initialState: ProjectState = {
  pages: [],
  currentPageId: null,
  viewMode: "list",
  searchQuery: "",
  filters: {},
  sortBy: "updatedAt",
  sortOrder: "desc",
}

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case "SET_PAGES":
      return { ...state, pages: action.payload }
    case "ADD_PAGE":
      return { ...state, pages: [...state.pages, action.payload] }
    case "UPDATE_PAGE":
      return {
        ...state,
        pages: state.pages.map((page) => (page.id === action.payload.id ? action.payload : page)),
      }
    case "DELETE_PAGE":
      return {
        ...state,
        pages: state.pages.filter((page) => page.id !== action.payload),
        currentPageId: state.currentPageId === action.payload ? null : state.currentPageId,
      }
    case "SET_CURRENT_PAGE":
      return { ...state, currentPageId: action.payload }
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }
    case "SET_FILTERS":
      return { ...state, filters: action.payload }
    case "SET_SORT":
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder }
    default:
      return state
  }
}

const ProjectContext = createContext<{
  state: ProjectState
  dispatch: React.Dispatch<ProjectAction>
  addPage: (page: Omit<Page, "id">) => void
  updatePage: (page: Page) => void
  deletePage: (id: string) => void
  getFilteredPages: () => Page[]
} | null>(null)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPages = localStorage.getItem("project-pages")
    if (savedPages) {
      dispatch({ type: "SET_PAGES", payload: JSON.parse(savedPages) })
    } else {
      // Initialize with sample data
      const samplePages: Page[] = [
        {
          id: "1",
          title: "Proyecto Principal",
          blocks: [
            {
              id: "b1",
              type: "heading",
              content: "Bienvenido al Gestor de Proyectos",
              level: 1,
            },
            {
              id: "b2",
              type: "text",
              content: "Esta es una aplicación de gestión de proyectos con funcionalidades avanzadas.",
            },
          ],
          properties: {
            status: "in-progress",
            priority: "high",
            assignee: "Juan Pérez",
            tags: ["importante", "proyecto"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
        {
          id: "2",
          title: "Tareas Pendientes",
          parentId: "1",
          blocks: [
            {
              id: "b3",
              type: "checklist",
              content: "Lista de tareas",
              items: [
                { id: "i1", text: "Diseñar interfaz", checked: true },
                { id: "i2", text: "Implementar funcionalidades", checked: false },
                { id: "i3", text: "Realizar pruebas", checked: false },
              ],
            },
          ],
          properties: {
            status: "todo",
            priority: "medium",
            assignee: "María García",
            tags: ["tareas"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      ]
      dispatch({ type: "SET_PAGES", payload: samplePages })
    }
  }, [])

  // Save to localStorage whenever pages change
  useEffect(() => {
    localStorage.setItem("project-pages", JSON.stringify(state.pages))
  }, [state.pages])

  const addPage = (pageData: Omit<Page, "id">) => {
    const newPage: Page = {
      ...pageData,
      id: Date.now().toString(),
    }
    dispatch({ type: "ADD_PAGE", payload: newPage })
  }

  const updatePage = (page: Page) => {
    const updatedPage = {
      ...page,
      properties: {
        ...page.properties,
        updatedAt: new Date().toISOString(),
      },
    }
    dispatch({ type: "UPDATE_PAGE", payload: updatedPage })
  }

  const deletePage = (id: string) => {
    // Also delete child pages
    const childPages = state.pages.filter((page) => page.parentId === id)
    childPages.forEach((child) => deletePage(child.id))
    dispatch({ type: "DELETE_PAGE", payload: id })
  }

  const getFilteredPages = () => {
    let filtered = state.pages

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (page) =>
          page.title.toLowerCase().includes(query) ||
          page.blocks.some(
            (block) =>
              block.content.toLowerCase().includes(query) ||
              block.items?.some((item) => item.text.toLowerCase().includes(query)),
          ),
      )
    }

    // Apply property filters
    if (state.filters.status) {
      filtered = filtered.filter((page) => page.properties.status === state.filters.status)
    }
    if (state.filters.priority) {
      filtered = filtered.filter((page) => page.properties.priority === state.filters.priority)
    }
    if (state.filters.assignee) {
      filtered = filtered.filter((page) => page.properties.assignee === state.filters.assignee)
    }
    if (state.filters.tags && state.filters.tags.length > 0) {
      filtered = filtered.filter((page) => state.filters.tags!.some((tag) => page.properties.tags.includes(tag)))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (state.sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "createdAt":
          aValue = new Date(a.properties.createdAt)
          bValue = new Date(b.properties.createdAt)
          break
        case "updatedAt":
          aValue = new Date(a.properties.updatedAt)
          bValue = new Date(b.properties.updatedAt)
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.properties.priority]
          bValue = priorityOrder[b.properties.priority]
          break
        default:
          return 0
      }

      if (aValue < bValue) return state.sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return state.sortOrder === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        addPage,
        updatePage,
        deletePage,
        getFilteredPages,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}

"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreateTaskDialog } from "@/components/create-task-dialog"

// Mock data for tasks
const initialColumns = {
  backlog: {
    id: "backlog",
    title: "Backlog",
    taskIds: ["task-1", "task-2", "task-3", "task-4"],
  },
  todo: {
    id: "todo",
    title: "To Do",
    taskIds: ["task-5", "task-6", "task-7"],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    taskIds: ["task-8", "task-9"],
  },
  review: {
    id: "review",
    title: "Review",
    taskIds: ["task-10"],
  },
  done: {
    id: "done",
    title: "Done",
    taskIds: ["task-11", "task-12", "task-13"],
  },
}

const initialTasks = {
  "task-1": {
    id: "task-1",
    title: "Research competitors",
    description: "Analyze top 5 competitors in the market",
    priority: "Low",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-2": {
    id: "task-2",
    title: "Create user personas",
    description: "Define 3-4 key user personas for the product",
    priority: "Medium",
    assignee: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-3": {
    id: "task-3",
    title: "Define MVP features",
    description: "List core features for the minimum viable product",
    priority: "High",
    assignee: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-4": {
    id: "task-4",
    title: "Create project roadmap",
    description: "Plan development phases and milestones",
    priority: "Medium",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-5": {
    id: "task-5",
    title: "Design system setup",
    description: "Create color palette, typography, and component library",
    priority: "High",
    assignee: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-6": {
    id: "task-6",
    title: "Homepage wireframes",
    description: "Create wireframes for the homepage",
    priority: "Medium",
    assignee: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-7": {
    id: "task-7",
    title: "Database schema design",
    description: "Design initial database schema for core entities",
    priority: "High",
    assignee: {
      name: "Alex Brown",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-8": {
    id: "task-8",
    title: "User authentication",
    description: "Implement login, registration, and password reset",
    priority: "High",
    assignee: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-9": {
    id: "task-9",
    title: "Product listing page",
    description: "Create page to display products with filtering",
    priority: "Medium",
    assignee: {
      name: "Alex Brown",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-10": {
    id: "task-10",
    title: "Shopping cart functionality",
    description: "Implement add to cart, remove, and update quantity",
    priority: "High",
    assignee: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-11": {
    id: "task-11",
    title: "Project setup",
    description: "Initialize repository and setup development environment",
    priority: "Low",
    assignee: {
      name: "Alex Brown",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-12": {
    id: "task-12",
    title: "API endpoints documentation",
    description: "Document all API endpoints with examples",
    priority: "Medium",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
    },
  },
  "task-13": {
    id: "task-13",
    title: "Initial team onboarding",
    description: "Onboard team members to the project",
    priority: "Low",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
    },
  },
}

const columnOrder = ["backlog", "todo", "inProgress", "review", "done"]

export function KanbanBoard({ projectId }: { projectId: string }) {
  const [columns, setColumns] = useState(initialColumns)
  const [tasks, setTasks] = useState(initialTasks)
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // If there's no destination or if the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const sourceColumn = columns[source.droppableId]
    const destinationColumn = columns[destination.droppableId]

    // If moving within the same column
    if (sourceColumn.id === destinationColumn.id) {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      })

      return
    }

    // Moving from one column to another
    const sourceTaskIds = Array.from(sourceColumn.taskIds)
    sourceTaskIds.splice(source.index, 1)
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    }

    const destinationTaskIds = Array.from(destinationColumn.taskIds)
    destinationTaskIds.splice(destination.index, 0, draggableId)
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    }

    setColumns({
      ...columns,
      [newSourceColumn.id]: newSourceColumn,
      [newDestinationColumn.id]: newDestinationColumn,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground">Drag and drop tasks to update their status</p>
        </div>
        <Button onClick={() => setIsCreateTaskOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {columnOrder.map((columnId) => {
            const column = columns[columnId]
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId])

            return (
              <div key={column.id} className="flex flex-col h-full">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="outline">{column.taskIds.length}</Badge>
                </div>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 rounded-lg p-3 ${snapshot.isDraggingOver ? "bg-muted/80" : "bg-muted/50"}`}
                      style={{ minHeight: "70vh" }}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-3 ${snapshot.isDragging ? "opacity-70" : ""}`}
                            >
                              <CardHeader className="p-3 pb-0">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <CardDescription className="text-xs mb-2">{task.description}</CardDescription>
                                <div className="flex justify-between items-center">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${
                                      task.priority === "High"
                                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                                        : task.priority === "Medium"
                                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                          : "bg-green-100 text-green-800 hover:bg-green-100"
                                    }`}
                                  >
                                    {task.priority}
                                  </Badge>
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={task.assignee.avatar || "/placeholder.svg"}
                                      alt={task.assignee.name}
                                    />
                                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>

      <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
    </div>
  )
}

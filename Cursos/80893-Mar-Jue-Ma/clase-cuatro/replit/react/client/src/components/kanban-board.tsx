import { Task } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface KanbanBoardProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (taskId: string, newStatus: "pending" | "in-progress" | "completed") => void;
}

// Componente para tarjetas arrastrable
function DraggableTaskCard({ task, onToggleComplete, onEditTask, onDeleteTask }: {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return { label: "Alta", className: "bg-destructive/10 text-destructive" };
      case "medium":
        return { label: "Media", className: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400" };
      case "low":
        return { label: "Baja", className: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" };
      default:
        return { label: priority, className: "bg-muted text-muted-foreground" };
    }
  };

  const priority = getPriorityLabel(task.priority);
  const isCompleted = task.completed;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "shadow-sm border-border mb-3 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing",
        `priority-${task.priority}`,
        isCompleted && "task-completed",
        isDragging && "scale-105 shadow-lg"
      )}
      data-testid={`kanban-task-${task.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4
            data-testid={`kanban-task-title-${task.id}`}
            className={cn(
              "text-sm font-medium",
              isCompleted
                ? "line-through text-muted-foreground"
                : "text-foreground"
            )}
          >
            {task.title}
          </h4>
          <div className="flex items-center gap-1">
            <Button
              data-testid={`kanban-toggle-${task.id}`}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(task.id);
              }}
              className={cn(
                "w-5 h-5 rounded-full border-2 p-0 transition-colors",
                isCompleted
                  ? "bg-primary border-primary hover:bg-primary/80"
                  : "border-muted-foreground/40 hover:border-primary"
              )}
            >
              {isCompleted && <Check className="h-3 w-3 text-primary-foreground" />}
            </Button>
          </div>
        </div>
        
        {task.description && (
          <p
            data-testid={`kanban-task-description-${task.id}`}
            className={cn(
              "text-xs mb-2",
              isCompleted
                ? "line-through text-muted-foreground/80"
                : "text-muted-foreground"
            )}
          >
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span
            data-testid={`kanban-priority-${task.id}`}
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-md",
              priority.className
            )}
          >
            {priority.label}
          </span>
          
          <div className="flex items-center gap-1">
            <Button
              data-testid={`kanban-edit-${task.id}`}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEditTask(task.id);
              }}
              className="p-1 h-auto text-muted-foreground hover:text-foreground hover:bg-muted"
              title="Editar tarea"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              data-testid={`kanban-delete-${task.id}`}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="p-1 h-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              title="Eliminar tarea"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          <span data-testid={`kanban-created-${task.id}`}>
            {formatDate(task.createdAt)}
          </span>
          {isCompleted && task.completedAt && (
            <span data-testid={`kanban-completed-${task.id}`} className="ml-2 text-emerald-600 font-medium">
              ✓ {formatDate(task.completedAt)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para áreas de drop
function DroppableArea({ id, children }: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="min-h-[400px] p-2 rounded-lg transition-colors">
      {children}
    </div>
  );
}

export function KanbanBoard({ tasks, onToggleComplete, onEditTask, onDeleteTask, onMoveTask }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    // Determinar la nueva columna basada en el contenedor
    let newStatus: "pending" | "in-progress" | "completed";
    const overId = over.id as string;
    
    if (overId === "pending" || overId.includes("pending")) {
      newStatus = "pending";
    } else if (overId === "in-progress" || overId.includes("in-progress")) {
      newStatus = "in-progress";
    } else if (overId === "completed" || overId.includes("completed")) {
      newStatus = "completed";
    } else {
      // Si se soltó sobre una tarea, obtener la columna de esa tarea
      const targetTask = tasks.find(t => t.id === overId);
      if (targetTask) {
        newStatus = targetTask.completed ? "completed" : "pending";
      } else {
        return; // No se puede determinar la columna
      }
    }

    // Solo mover si es diferente columna
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const currentStatus = task.completed ? "completed" : "pending";
    if (currentStatus !== newStatus) {
      onMoveTask(taskId, newStatus);
    }
  };

  const columns = [
    {
      title: "Por Hacer",
      status: "pending" as const,
      tasks: tasks.filter(task => !task.completed),
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "En Progreso",
      status: "in-progress" as const,
      tasks: [], // Para futuras funcionalidades - podrías agregar un campo status a Task
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
    },
    {
      title: "Completadas",
      status: "completed" as const,
      tasks: tasks.filter(task => task.completed),
      bgColor: "bg-green-50 dark:bg-green-950/20"
    }
  ];

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4 min-h-[500px]" data-testid="kanban-board">
        {columns.map((column) => (
          <div key={column.status} className="flex flex-col">
            <Card 
              className={cn("border-border h-full", column.bgColor)}
              data-testid={`kanban-column-${column.status}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-foreground flex items-center justify-between">
                  {column.title}
                  <span 
                    data-testid={`kanban-column-count-${column.status}`}
                    className="text-sm font-normal bg-background/80 text-muted-foreground px-2 py-1 rounded-md"
                  >
                    {column.tasks.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-1">
                <SortableContext
                  id={column.status}
                  items={column.tasks.map(task => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <DroppableArea id={column.status}>
                    {column.tasks.length === 0 ? (
                      <div 
                        data-testid={`kanban-empty-${column.status}`}
                        className="text-center py-8 text-muted-foreground text-sm"
                      >
                        {column.status === "pending" && "Arrastra tareas aquí"}
                        {column.status === "in-progress" && "Tareas en progreso"}
                        {column.status === "completed" && "Tareas completadas"}
                      </div>
                    ) : (
                      column.tasks.map((task) => (
                        <DraggableTaskCard 
                          key={task.id} 
                          task={task}
                          onToggleComplete={onToggleComplete}
                          onEditTask={onEditTask}
                          onDeleteTask={onDeleteTask}
                        />
                      ))
                    )}
                  </DroppableArea>
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <DragOverlay>
        {activeTask ? (
          <DraggableTaskCard 
            task={activeTask}
            onToggleComplete={onToggleComplete}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
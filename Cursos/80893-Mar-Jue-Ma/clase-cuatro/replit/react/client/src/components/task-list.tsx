import { Task } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Edit2, Trash2, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onEditTask, onDeleteTask }: TaskListProps) {
  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return { label: "Alta", className: "bg-destructive/10 text-destructive" };
      case "medium":
        return { label: "Media", className: "bg-orange-100 text-orange-600" };
      case "low":
        return { label: "Baja", className: "bg-emerald-100 text-emerald-600" };
      default:
        return { label: priority, className: "bg-muted text-muted-foreground" };
    }
  };

  const getSprintLabel = (sprint: string) => {
    switch (sprint) {
      case "sprint-1":
        return "Sprint 1";
      case "sprint-2":
        return "Sprint 2";
      case "sprint-3":
        return "Sprint 3";
      case "backlog":
        return "Backlog";
      default:
        return sprint;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-state">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Clipboard className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No hay tareas</h3>
        <p className="text-sm text-muted-foreground">Crea tu primera tarea para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const priority = getPriorityLabel(task.priority);
        const isCompleted = task.completed;
        
        return (
          <Card
            key={task.id}
            className={cn(
              "shadow-sm border-border p-4 hover:shadow-md transition-all duration-200",
              `priority-${task.priority}`,
              isCompleted && "task-completed"
            )}
            data-testid={`task-card-${task.id}`}
          >
            <div className="flex items-start gap-4">
              <Button
                data-testid={`button-toggle-${task.id}`}
                variant="ghost"
                size="sm"
                onClick={() => onToggleComplete(task.id)}
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full border-2 p-0 mt-0.5 transition-colors",
                  isCompleted
                    ? "bg-primary border-primary hover:bg-primary/80"
                    : "border-muted-foreground/40 hover:border-primary"
                )}
              >
                {isCompleted && <Check className="h-3 w-3 text-primary-foreground" />}
              </Button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    data-testid={`text-task-title-${task.id}`}
                    className={cn(
                      "text-sm font-medium",
                      isCompleted
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    )}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      data-testid={`badge-priority-${task.id}`}
                      className={cn(
                        "px-2 py-1 text-xs font-medium rounded-md",
                        priority.className
                      )}
                    >
                      {priority.label}
                    </span>
                    <span
                      data-testid={`badge-sprint-${task.id}`}
                      className={cn(
                        "px-2 py-1 text-xs font-medium rounded-md",
                        task.sprint === "backlog"
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {getSprintLabel(task.sprint)}
                    </span>
                  </div>
                </div>
                
                {task.description && (
                  <p
                    data-testid={`text-task-description-${task.id}`}
                    className={cn(
                      "text-sm mb-3",
                      isCompleted
                        ? "line-through text-muted-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span data-testid={`text-created-at-${task.id}`}>
                      {formatDate(task.createdAt)}
                    </span>
                    {isCompleted && task.completedAt && (
                      <span data-testid={`text-completed-at-${task.id}`} className="text-emerald-600 font-medium">
                        ✓ Completada {formatDate(task.completedAt)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      data-testid={`button-edit-${task.id}`}
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditTask(task.id)}
                      className="p-1.5 h-auto text-muted-foreground hover:text-foreground hover:bg-muted"
                      title="Editar tarea"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      data-testid={`button-delete-${task.id}`}
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 h-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="Eliminar tarea"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

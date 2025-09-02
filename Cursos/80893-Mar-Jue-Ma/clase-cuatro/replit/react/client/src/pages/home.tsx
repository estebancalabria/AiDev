import { useState, useEffect } from "react";
import { Task } from "@shared/schema";
import { TaskStorage } from "@/lib/storage";
import { TaskForm } from "@/components/task-form";
import { TaskFilters } from "@/components/task-filters";
import { KanbanBoard } from "@/components/kanban-board";
import { ProgressSummary } from "@/components/progress-summary";
import { ListTodo, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed">("all");
  const [sprintFilter, setSprintFilter] = useState<string>("all");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const loadedTasks = TaskStorage.getTasks();
    setTasks(loadedTasks);
  };

  const handleTaskCreated = () => {
    loadTasks();
    setShowTaskForm(false);
  };

  const handleToggleComplete = (id: string) => {
    try {
      const result = TaskStorage.toggleTaskCompletion(id);
      if (result) {
        loadTasks();
        toast({
          title: result.completed ? "¡Tarea completada!" : "Tarea marcada como pendiente",
          description: result.title,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la tarea",
        variant: "destructive",
      });
    }
  };

  const handleEditTask = (id: string) => {
    // For now, just show a toast - full edit functionality could be added later
    toast({
      title: "Función no implementada",
      description: "La edición de tareas estará disponible próximamente",
    });
  };

  const handleDeleteTask = (id: string) => {
    try {
      const success = TaskStorage.deleteTask(id);
      if (success) {
        loadTasks();
        toast({
          title: "Tarea eliminada",
          description: "La tarea ha sido eliminada correctamente",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea",
        variant: "destructive",
      });
    }
  };

  const handleMoveTask = (taskId: string, newStatus: "pending" | "in-progress" | "completed") => {
    try {
      const updates: Partial<Task> = {};
      
      if (newStatus === "completed") {
        updates.completed = true;
        updates.completedAt = new Date();
      } else {
        updates.completed = false;
        updates.completedAt = undefined;
      }

      const result = TaskStorage.updateTask(taskId, updates);
      if (result) {
        loadTasks();
        toast({
          title: "Tarea movida",
          description: `Tarea movida a ${newStatus === "completed" ? "completadas" : "pendientes"}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo mover la tarea",
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (statusFilter === "active" && task.completed) return false;
    if (statusFilter === "completed" && !task.completed) return false;
    
    // Sprint filter
    if (sprintFilter !== "all" && task.sprint !== sprintFilter) return false;
    
    return true;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ListTodo className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 data-testid="text-app-title" className="text-2xl font-semibold text-foreground">
                  TaskFlow
                </h1>
                <p className="text-sm text-muted-foreground">Gestor de tareas minimalista</p>
              </div>
            </div>
            <div className="text-right">
              <p data-testid="text-task-stats" className="text-sm font-medium text-foreground">
                {taskCounts.completed} de {taskCounts.all}
              </p>
              <p className="text-xs text-muted-foreground">completadas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Task Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">Tablero Kanban</h2>
          <Button
            data-testid="button-add-task"
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        </div>

        {/* Task Creation Form - Collapsible */}
        {showTaskForm && (
          <div className="mb-8 max-w-2xl">
            <Card className="shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-card-foreground">Nueva Tarea</h3>
                  <Button
                    data-testid="button-close-form"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTaskForm(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </Button>
                </div>
                <TaskForm onTaskCreated={handleTaskCreated} />
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Filter Controls */}
        <div className="mb-6">
          <TaskFilters
            statusFilter={statusFilter}
            sprintFilter={sprintFilter}
            onStatusFilterChange={setStatusFilter}
            onSprintFilterChange={setSprintFilter}
            taskCounts={taskCounts}
          />
        </div>
        
        {/* Kanban Board */}
        <div className="mb-12">
          <KanbanBoard
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
          />
        </div>
        
        {/* Progress Summary */}
        <div className="max-w-2xl">
          <ProgressSummary tasks={tasks} currentSprint={sprintFilter} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          TaskFlow - Gestión de tareas simple y eficiente
        </p>
      </footer>
    </div>
  );
}

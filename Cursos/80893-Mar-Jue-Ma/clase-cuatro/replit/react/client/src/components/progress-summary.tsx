import { Task } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface ProgressSummaryProps {
  tasks: Task[];
  currentSprint: string;
}

export function ProgressSummary({ tasks, currentSprint }: ProgressSummaryProps) {
  const sprintTasks = tasks.filter(
    task => currentSprint === "all" || task.sprint === currentSprint
  );
  
  const totalTasks = sprintTasks.length;
  const completedTasks = sprintTasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
      case "all":
        return "Todos los sprints";
      default:
        return sprint;
    }
  };

  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-card-foreground">Progreso del Sprint</h3>
          <span data-testid="text-current-sprint" className="text-sm text-muted-foreground">
            {getSprintLabel(currentSprint)}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progreso general</span>
            <span data-testid="text-progress-percentage" className="font-medium text-foreground">
              {progressPercentage}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              data-testid="progress-bar"
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <p data-testid="text-total-tasks" className="text-lg font-semibold text-foreground">
                {totalTasks}
              </p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p data-testid="text-active-tasks" className="text-lg font-semibold text-primary">
                {activeTasks}
              </p>
              <p className="text-xs text-muted-foreground">Activas</p>
            </div>
            <div className="text-center">
              <p data-testid="text-completed-tasks" className="text-lg font-semibold text-emerald-600">
                {completedTasks}
              </p>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

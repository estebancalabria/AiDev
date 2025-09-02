import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskFiltersProps {
  statusFilter: "all" | "active" | "completed";
  sprintFilter: string;
  onStatusFilterChange: (filter: "all" | "active" | "completed") => void;
  onSprintFilterChange: (filter: string) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TaskFilters({
  statusFilter,
  sprintFilter,
  onStatusFilterChange,
  onSprintFilterChange,
  taskCounts,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground mb-2">Filtrar por estado</p>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            data-testid="filter-all"
            onClick={() => onStatusFilterChange("all")}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              statusFilter === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Todas{" "}
            <span className="ml-1 px-1.5 py-0.5 bg-muted text-muted-foreground rounded text-xs">
              {taskCounts.all}
            </span>
          </button>
          <button
            data-testid="filter-active"
            onClick={() => onStatusFilterChange("active")}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              statusFilter === "active"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Activas{" "}
            <span className="ml-1 px-1.5 py-0.5 bg-muted-foreground/20 rounded text-xs">
              {taskCounts.active}
            </span>
          </button>
          <button
            data-testid="filter-completed"
            onClick={() => onStatusFilterChange("completed")}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              statusFilter === "completed"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Completadas{" "}
            <span className="ml-1 px-1.5 py-0.5 bg-muted-foreground/20 rounded text-xs">
              {taskCounts.completed}
            </span>
          </button>
        </div>
      </div>
      
      <div className="sm:w-48">
        <p className="text-sm font-medium text-foreground mb-2">Sprint</p>
        <Select value={sprintFilter} onValueChange={onSprintFilterChange}>
          <SelectTrigger data-testid="select-sprint-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los sprints</SelectItem>
            <SelectItem value="backlog">Backlog</SelectItem>
            <SelectItem value="sprint-1">Sprint 1</SelectItem>
            <SelectItem value="sprint-2">Sprint 2</SelectItem>
            <SelectItem value="sprint-3">Sprint 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

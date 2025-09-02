import { Task } from '@shared/schema';
import { cn } from '@/lib/utils';
import { useDragDrop } from '@/lib/drag-drop';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

const assigneeColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
];

function getAssigneeColor(assignee: string) {
  const index = assignee.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return assigneeColors[index % assigneeColors.length];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { setDraggedTask } = useDragDrop();

  const handleDragStart = (e: React.DragEvent) => {
    setDraggedTask(task);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedTask(null);
    e.currentTarget.classList.remove('dragging');
  };

  const isCompleted = task.status === 'done';

  return (
    <div
      className={cn(
        "kanban-card bg-background border border-border rounded-lg p-4 cursor-move hover:shadow-md transition-all",
        isCompleted && "opacity-75"
      )}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className={cn(
          "font-medium text-foreground text-sm",
          isCompleted && "line-through"
        )}>
          {task.title}
        </h4>
        <button 
          className="text-muted-foreground hover:text-foreground text-xs"
          onClick={() => onEdit?.(task)}
          data-testid={`button-edit-task-${task.id}`}
        >
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      
      {task.description && (
        <p className="text-muted-foreground text-xs mb-3">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            isCompleted ? "bg-green-100 text-green-800" : priorityColors[task.priority]
          )}>
            {isCompleted ? "Completed" : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          {task.storyPoints && (
            <span className="text-muted-foreground text-xs">{task.storyPoints} pts</span>
          )}
        </div>
        
        {task.assignee && (
          <div 
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium",
              getAssigneeColor(task.assignee)
            )}
            title={task.assignee}
          >
            {getInitials(task.assignee)}
          </div>
        )}
      </div>
      
      {isCompleted && (
        <div className="flex items-center justify-end mt-2">
          <i className="fas fa-check-circle text-green-500"></i>
        </div>
      )}
    </div>
  );
}

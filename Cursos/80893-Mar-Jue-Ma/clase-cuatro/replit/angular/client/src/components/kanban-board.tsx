import { Task, TaskStatus } from '@shared/schema';
import { TaskCard } from './task-card';
import { useDragDrop } from '@/lib/drag-drop';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
}

const statusConfig = {
  todo: { 
    title: 'To Do', 
    color: 'bg-gray-400',
    icon: 'fas fa-circle'
  },
  inprogress: { 
    title: 'In Progress', 
    color: 'bg-blue-400',
    icon: 'fas fa-circle'
  },
  done: { 
    title: 'Done', 
    color: 'bg-green-400',
    icon: 'fas fa-check-circle'
  },
};

function KanbanColumn({ title, status, tasks, onEdit }: KanbanColumnProps) {
  const { onDrop, draggedTask } = useDragDrop();
  const config = statusConfig[status];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (draggedTask && draggedTask.status !== status) {
      onDrop(draggedTask.id, status);
    }
  };

  return (
    <div className="kanban-column bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={cn("w-3 h-3 rounded-full", config.color)}></div>
          <h3 className="font-semibold text-foreground">{config.title}</h3>
          <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        <button className="text-muted-foreground hover:text-foreground text-sm">
          <i className={config.icon}></i>
        </button>
      </div>
      
      <div 
        className="space-y-3 min-h-[400px]"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid={`kanban-column-${status}`}
      >
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEdit}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">
            No tasks in {config.title.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
}

export function KanbanBoard({ tasks, onTaskEdit }: KanbanBoardProps) {
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="kanban-board">
      <KanbanColumn 
        title="To Do" 
        status="todo" 
        tasks={todoTasks} 
        onEdit={onTaskEdit}
      />
      <KanbanColumn 
        title="In Progress" 
        status="inprogress" 
        tasks={inProgressTasks} 
        onEdit={onTaskEdit}
      />
      <KanbanColumn 
        title="Done" 
        status="done" 
        tasks={doneTasks} 
        onEdit={onTaskEdit}
      />
    </div>
  );
}

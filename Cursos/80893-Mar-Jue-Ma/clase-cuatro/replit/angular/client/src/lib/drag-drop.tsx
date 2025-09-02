import { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TaskStatus } from '@shared/schema';

interface DragDropContextType {
  draggedTask: Task | null;
  setDraggedTask: (task: Task | null) => void;
  onDrop: (taskId: string, newStatus: TaskStatus) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function DragDropProvider({ 
  children, 
  onTaskMove 
}: { 
  children: ReactNode;
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const onDrop = (taskId: string, newStatus: TaskStatus) => {
    onTaskMove(taskId, newStatus);
    setDraggedTask(null);
  };

  return (
    <DragDropContext.Provider value={{ draggedTask, setDraggedTask, onDrop }}>
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}

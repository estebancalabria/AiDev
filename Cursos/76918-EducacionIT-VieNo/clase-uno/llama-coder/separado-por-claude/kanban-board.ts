import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "/components/ui/card";

interface KanbanColumn {
  id: number;
  title: string;
  tasks: number[];
}

interface KanbanBoardState {
  columns: KanbanColumn[];
}

const initialKanbanBoard: KanbanBoardState = {
  columns: [
    { id: 1, title: 'To Do', tasks: [1, 2] },
    { id: 2, title: 'In Progress', tasks: [3] },
    { id: 3, title: 'Done', tasks: [] },
  ],
};

const KanbanBoard: React.FC = () => {
  const { columns } = initialKanbanBoard;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Kanban Board</CardTitle>
        <CardDescription>Tablero de tareas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row space-x-4">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col space-y-2">
              <h2>{column.title}</h2>
              {column.tasks.map((taskId) => (
                <div 
                  key={taskId} 
                  className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" 
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanBoard;

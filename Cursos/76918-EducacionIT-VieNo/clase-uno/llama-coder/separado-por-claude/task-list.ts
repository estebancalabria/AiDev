import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "/components/ui/card";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  assigned: string;
}

const initialTasks: Task[] = [
  { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1', priority: 'Alta', dueDate: '2024-03-01', assigned: 'Juan' },
  { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2', priority: 'Media', dueDate: '2024-03-05', assigned: 'Pedro' },
  { id: 3, title: 'Tarea 3', description: 'Descripción de la tarea 3', priority: 'Baja', dueDate: '2024-03-10', assigned: 'Luis' },
];

const TaskList: React.FC = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Lista de Tareas</CardTitle>
        <CardDescription>Lista detallada de tareas</CardDescription>
      </CardHeader>
      <CardContent>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Fecha de vencimiento</th>
              <th>Asignado</th>
            </tr>
          </thead>
          <tbody>
            {initialTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>{task.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default TaskList;

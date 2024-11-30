import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";

const data = [
  { name: 'Día 1', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Día 2', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Día 3', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Día 4', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Día 5', uv: 1890, pv: 4800, amt: 2181 },
];

const Dashboard = () => {
  const [sprint, setSprint] = useState({
    tasks: [
      { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1', priority: 'Alta', dueDate: '2024-03-01', assigned: 'Juan' },
      { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2', priority: 'Media', dueDate: '2024-03-05', assigned: 'Pedro' },
      { id: 3, title: 'Tarea 3', description: 'Descripción de la tarea 3', priority: 'Baja', dueDate: '2024-03-10', assigned: 'Luis' },
    ],
    completedPoints: 10,
    remainingTime: 5,
    teamPerformance: 80,
  });

  const [kanbanBoard, setKanbanBoard] = useState({
    columns: [
      { id: 1, title: 'To Do', tasks: [1, 2] },
      { id: 2, title: 'In Progress', tasks: [3] },
      { id: 3, title: 'Done', tasks: [] },
    ],
  });

  const [activeTab, setActiveTab] = useState('burndown');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <Button variant="secondary" onClick={() => handleTabChange('burndown')}>Burndown Chart</Button>
        <Button variant="secondary" onClick={() => handleTabChange('kanban')}>Kanban Board</Button>
        <Button variant="secondary" onClick={() => handleTabChange('sprint')}>Resumen de Sprint</Button>
        <Button variant="secondary" onClick={() => handleTabChange('tasks')}>Lista de Tareas</Button>
        <Button variant="secondary" onClick={() => handleTabChange('velocity')}>Gráficos de Velocidad del Equipo</Button>
      </div>

      {activeTab === 'burndown' && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Burndown Chart</CardTitle>
            <CardDescription>Gráfico de progreso del sprint</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>
      )}

      {activeTab === 'kanban' && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Kanban Board</CardTitle>
            <CardDescription>Tablero de tareas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row space-x-4">
              {kanbanBoard.columns.map((column) => (
                <div key={column.id} className="flex flex-col space-y-2">
                  <h2>{column.title}</h2>
                  {column.tasks.map((taskId) => (
                    <div key={taskId} className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'sprint' && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Resumen de Sprint</CardTitle>
            <CardDescription>Información general del sprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row space-x-4">
              <div>
                <h2>Puntos de historia completados</h2>
                <p>{sprint.completedPoints}</p>
              </div>
              <div>
                <h2>Tiempo restante</h2>
                <p>{sprint.remainingTime} días</p>
              </div>
              <div>
                <h2>Rendimiento del equipo</h2>
                <p>{sprint.teamPerformance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'tasks' && (
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
                {sprint.tasks.map((task) => (
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
      )}

      {activeTab === 'velocity' && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Gráficos de Velocidad del Equipo</CardTitle>
            <CardDescription>Gráficos de velocidad del equipo</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "/components/ui/card";

const velocityData = [
  { name: 'Día 1', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Día 2', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Día 3', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Día 4', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Día 5', uv: 1890, pv: 4800, amt: 2181 },
];

const TeamVelocityChart: React.FC = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Gráficos de Velocidad del Equipo</CardTitle>
        <CardDescription>Gráficos de velocidad del equipo</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart width={500} height={300} data={velocityData}>
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
  );
};

export default TeamVelocityChart;

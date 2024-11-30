import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "/components/ui/card";

interface SprintSummaryState {
  completedPoints: number;
  remainingTime: number;
  teamPerformance: number;
}

const initialSprintSummary: SprintSummaryState = {
  completedPoints: 10,
  remainingTime: 5,
  teamPerformance: 80,
};

const SprintSummary: React.FC = () => {
  const { completedPoints, remainingTime, teamPerformance } = initialSprintSummary;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Resumen de Sprint</CardTitle>
        <CardDescription>Información general del sprint</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row space-x-4">
          <div>
            <h2>Puntos de historia completados</h2>
            <p>{completedPoints}</p>
          </div>
          <div>
            <h2>Tiempo restante</h2>
            <p>{remainingTime} días</p>
          </div>
          <div>
            <h2>Rendimiento del equipo</h2>
            <p>{teamPerformance}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintSummary;

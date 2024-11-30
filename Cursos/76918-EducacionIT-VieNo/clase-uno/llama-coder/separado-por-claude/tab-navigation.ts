import React from 'react';
import { Button } from "/components/ui/button";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'burndown', label: 'Burndown Chart' },
    { id: 'kanban', label: 'Kanban Board' },
    { id: 'sprint', label: 'Resumen de Sprint' },
    { id: 'tasks', label: 'Lista de Tareas' },
    { id: 'velocity', label: 'Gráficos de Velocidad del Equipo' }
  ];

  return (
    <div className="flex flex-row space-x-4">
      {tabs.map((tab) => (
        <Button 
          key={tab.id}
          variant="secondary" 
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation;

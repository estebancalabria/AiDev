import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import BurndownChart from './BurndownChart';
import KanbanBoard from './KanbanBoard';
import SprintSummary from './SprintSummary';
import TaskList from './TaskList';
import TeamVelocityChart from './TeamVelocityChart';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('burndown');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'burndown':
        return <BurndownChart />;
      case 'kanban':
        return <KanbanBoard />;
      case 'sprint':
        return <SprintSummary />;
      case 'tasks':
        return <TaskList />;
      case 'velocity':
        return <TeamVelocityChart />;
      default:
        return <BurndownChart />;
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      {renderActiveTab()}
    </div>
  );
};

export default Dashboard;

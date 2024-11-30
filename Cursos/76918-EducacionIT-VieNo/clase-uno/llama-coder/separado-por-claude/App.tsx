import React from 'react';
import Dashboard from './components/Dashboard'; 

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sprint Management Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default App;

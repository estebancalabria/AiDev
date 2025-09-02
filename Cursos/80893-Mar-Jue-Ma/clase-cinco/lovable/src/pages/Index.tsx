import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/LoginForm';
import { Layout } from '@/components/Layout';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AppointmentBooking } from '@/components/AppointmentBooking';

const Index = () => {
  const { user, isLoading, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState<'appointments' | 'admin'>('appointments');
  
  console.log('Index render - user:', user, 'isLoading:', isLoading, 'isAdmin:', isAdmin);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={isAdmin ? setActiveView : undefined}
    >
      {isAdmin ? (
        activeView === 'admin' ? <AdminDashboard /> : <AppointmentBooking />
      ) : (
        <AppointmentBooking />
      )}
    </Layout>
  );
};

export default Index;
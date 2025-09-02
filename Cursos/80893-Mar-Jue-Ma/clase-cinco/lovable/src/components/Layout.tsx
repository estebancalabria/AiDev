import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Settings, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView?: 'appointments' | 'admin';
  onViewChange?: (view: 'appointments' | 'admin') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">TurnosApp</h1>
              </div>
              
              {user && isAdmin && onViewChange && (
                <nav className="flex space-x-2">
                  <Button
                    variant={activeView === 'appointments' ? 'default' : 'ghost'}
                    onClick={() => onViewChange('appointments')}
                    className="flex items-center space-x-2"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Turnos</span>
                  </Button>
                  <Button
                    variant={activeView === 'admin' ? 'default' : 'ghost'}
                    onClick={() => onViewChange('admin')}
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </Button>
                </nav>
              )}
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};
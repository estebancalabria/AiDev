import React from 'react';
import { LogOut, User, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">IAccademy</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user?.user_metadata?.full_name || 'Estudiante'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
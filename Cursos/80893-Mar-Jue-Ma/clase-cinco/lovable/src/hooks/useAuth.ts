import { useState, useEffect } from 'react';
import { User } from '@/types';

const ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Administrador',
  email: 'admin@turnos.com',
  role: 'admin'
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('currentUser');
    console.log('useAuth useEffect - savedUser:', savedUser);
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('Setting user from localStorage:', parsedUser);
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const loginAsAdmin = () => {
    console.log('loginAsAdmin called');
    setUser(ADMIN_USER);
    localStorage.setItem('currentUser', JSON.stringify(ADMIN_USER));
    console.log('Admin user set:', ADMIN_USER);
  };

  const loginAsClient = (name: string, email: string) => {
    const clientUser: User = {
      id: `client-${Date.now()}`,
      name,
      email,
      role: 'client'
    };
    setUser(clientUser);
    localStorage.setItem('currentUser', JSON.stringify(clientUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return {
    user,
    isLoading,
    loginAsAdmin,
    loginAsClient,
    logout,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client'
  };
};
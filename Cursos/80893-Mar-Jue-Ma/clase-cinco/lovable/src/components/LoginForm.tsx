import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, User, Shield } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const { loginAsAdmin, loginAsClient } = useAuth();
  const [clientForm, setClientForm] = useState({ name: '', email: '' });

  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientForm.name && clientForm.email) {
      loginAsClient(clientForm.name, clientForm.email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">TurnosApp</h1>
          </div>
          <p className="text-muted-foreground">Sistema de gestión de turnos online</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Acceder al Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Cliente</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="space-y-4">
                <form onSubmit={handleClientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ingresa tu nombre"
                      value={clientForm.name}
                      onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={clientForm.email}
                      onChange={(e) => setClientForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Acceder como Cliente
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Accede como administrador para configurar el sistema y gestionar turnos.
                  </p>
                  <Button onClick={() => {
                    console.log('Admin button clicked');
                    loginAsAdmin();
                  }} className="w-full">
                    Acceder como Administrador
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
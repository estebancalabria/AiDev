import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppointments } from '@/hooks/useAppointments';
import { BusinessConfigForm } from './BusinessConfigForm';
import { Calendar, Clock, Users, Settings, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Appointment } from '@/types';

export const AdminDashboard: React.FC = () => {
  const { appointments, businessConfig } = useAppointments();
  const [showConfig, setShowConfig] = useState(!businessConfig);

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    const variants = {
      confirmed: 'default',
      pending: 'secondary',
      cancelled: 'destructive'
    } as const;

    const labels = {
      confirmed: 'Confirmado',
      pending: 'Pendiente',
      cancelled: 'Cancelado'
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  if (showConfig) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Configuración del Negocio</h2>
            <p className="text-muted-foreground">Configure los datos básicos de su negocio para comenzar a recibir turnos</p>
          </div>
          {businessConfig && (
            <Button variant="outline" onClick={() => setShowConfig(false)}>
              Volver al Dashboard
            </Button>
          )}
        </div>
        <BusinessConfigForm onSuccess={() => setShowConfig(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h2>
          <p className="text-muted-foreground">Gestiona turnos y configuración de tu negocio</p>
        </div>
        <Button onClick={() => setShowConfig(true)} className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Configurar Negocio</span>
        </Button>
      </div>

      {businessConfig && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Configuración Actual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Negocio</p>
                <p className="text-lg font-semibold">{businessConfig.name}</p>
                <p className="text-sm text-muted-foreground">{businessConfig.industry}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horarios</p>
                <p className="text-lg font-semibold">
                  {businessConfig.workingHours.start} - {businessConfig.workingHours.end}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duración por turno</p>
                <p className="text-lg font-semibold">{businessConfig.appointmentDuration} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Turnos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {appointments.filter(apt => apt.status !== 'cancelled').length} activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoy</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.filter(apt => apt.status === 'confirmed').length} confirmados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(appointments.map(apt => apt.clientEmail)).size}
            </div>
            <p className="text-xs text-muted-foreground">únicos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Turnos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments
              .filter(apt => {
                const appointmentDate = new Date(`${apt.date}T${apt.time}`);
                return appointmentDate >= new Date() && apt.status !== 'cancelled';
              })
              .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA.getTime() - dateB.getTime();
              })
              .slice(0, 5)
              .map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(appointment.status)}
                    <div>
                      <p className="font-medium">{appointment.clientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} • {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(appointment.status)}
                    <p className="text-sm text-muted-foreground">{appointment.duration} min</p>
                  </div>
                </div>
              ))}
            
            {appointments.filter(apt => apt.status !== 'cancelled').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay turnos programados</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
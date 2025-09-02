import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AppointmentBooking: React.FC = () => {
  const { businessConfig, getAvailableTimeSlots, createAppointment, getAppointmentsByUser } = useAppointments();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [clientData, setClientData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });

  const userAppointments = user ? getAppointmentsByUser(user.email) : [];
  const availableSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  // Generate next 30 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessConfig) {
      toast({
        title: "Error",
        description: "No hay configuración de negocio disponible",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Por favor selecciona fecha y hora",
        variant: "destructive"
      });
      return;
    }

    const appointment = {
      clientName: clientData.name,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      date: selectedDate,
      time: selectedTime,
      duration: businessConfig.appointmentDuration,
      businessId: businessConfig.id,
      status: 'confirmed' as const,
      customData: formData
    };

    createAppointment(appointment);
    
    toast({
      title: "¡Turno reservado!",
      description: `Tu turno para el ${selectedDate} a las ${selectedTime} ha sido confirmado`,
    });

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setFormData({});
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!businessConfig) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Sistema no configurado</h3>
        <p className="text-muted-foreground">
          El administrador aún no ha configurado el sistema de turnos.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Reservar Turno</h2>
        <p className="text-muted-foreground">
          {businessConfig.name} • {businessConfig.industry}
        </p>
        <div className="flex items-center justify-center space-x-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{businessConfig.workingHours.start} - {businessConfig.workingHours.end}</span>
          </span>
          <span>•</span>
          <span>{businessConfig.appointmentDuration} min por turno</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Seleccionar Fecha y Hora</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una fecha" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableDates().map((date) => (
                    <SelectItem key={date} value={date}>
                      {formatDate(date)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDate && (
              <div className="space-y-3">
                <Label>Horarios Disponibles</Label>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      type="button"
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="text-sm"
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                {availableSlots.filter(slot => slot.available).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay horarios disponibles para esta fecha
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nombre completo *</Label>
                  <Input
                    id="clientName"
                    value={clientData.name}
                    onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={clientData.email}
                    onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Teléfono (opcional)</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  value={clientData.phone}
                  onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+54 11 1234-5678"
                />
              </div>

              {businessConfig.customFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <span className="text-destructive"> *</span>}
                  </Label>
                  
                  {field.type === 'text' && (
                    <Input
                      id={field.id}
                      value={formData[field.id] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      required={field.required}
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <Textarea
                      id={field.id}
                      value={formData[field.id] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                      required={field.required}
                      rows={3}
                    />
                  )}
                  
                  {field.type === 'select' && field.options && (
                    <Select
                      value={formData[field.id] || ''}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, [field.id]: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Selecciona ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}

              <Button
                type="submit"
                className="w-full"
                disabled={!selectedDate || !selectedTime}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar Turno
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {userAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mis Turnos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userAppointments
                .filter(apt => apt.status !== 'cancelled')
                .sort((a, b) => {
                  const dateA = new Date(`${a.date}T${a.time}`);
                  const dateB = new Date(`${b.date}T${b.time}`);
                  return dateB.getTime() - dateA.getTime();
                })
                .map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-success-light border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">
                          {formatDate(appointment.date)} • {appointment.time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Duración: {appointment.duration} minutos
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Confirmado</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
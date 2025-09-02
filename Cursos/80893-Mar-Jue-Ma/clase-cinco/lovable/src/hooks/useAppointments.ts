import { useState, useEffect } from 'react';
import { Appointment, BusinessConfig, TimeSlot } from '@/types';

const STORAGE_KEYS = {
  APPOINTMENTS: 'appointments',
  BUSINESS_CONFIG: 'businessConfig'
};

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig | null>(null);

  useEffect(() => {
    // Load data from localStorage
    const savedAppointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const savedConfig = localStorage.getItem(STORAGE_KEYS.BUSINESS_CONFIG);

    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }

    if (savedConfig) {
      setBusinessConfig(JSON.parse(savedConfig));
    }
  }, []);

  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(newAppointments));
  };

  const saveBusinessConfig = (config: BusinessConfig) => {
    setBusinessConfig(config);
    localStorage.setItem(STORAGE_KEYS.BUSINESS_CONFIG, JSON.stringify(config));
  };

  const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `appointment-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedAppointments = [...appointments, newAppointment];
    saveAppointments(updatedAppointments);
    return newAppointment;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === id ? { ...apt, ...updates } : apt
    );
    saveAppointments(updatedAppointments);
  };

  const cancelAppointment = (id: string) => {
    updateAppointment(id, { status: 'cancelled' });
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id);
    saveAppointments(updatedAppointments);
  };

  const getAvailableTimeSlots = (date: string): TimeSlot[] => {
    if (!businessConfig) return [];

    const [startHour] = businessConfig.workingHours.start.split(':').map(Number);
    const [endHour] = businessConfig.workingHours.end.split(':').map(Number);
    const duration = businessConfig.appointmentDuration;

    const slots: TimeSlot[] = [];
    const appointmentsOnDate = appointments.filter(apt => 
      apt.date === date && apt.status !== 'cancelled'
    );

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const existingAppointment = appointmentsOnDate.find(apt => apt.time === time);
        
        slots.push({
          time,
          available: !existingAppointment,
          appointmentId: existingAppointment?.id
        });
      }
    }

    return slots;
  };

  const getAppointmentsByUser = (userId: string) => {
    return appointments.filter(apt => apt.clientEmail === userId);
  };

  return {
    appointments,
    businessConfig,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    deleteAppointment,
    saveBusinessConfig,
    getAvailableTimeSlots,
    getAppointmentsByUser
  };
};
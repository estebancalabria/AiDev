export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
}

export interface BusinessConfig {
  id: string;
  name: string;
  industry: string;
  workingHours: {
    start: string;
    end: string;
  };
  appointmentDuration: number; // in minutes
  customFields: CustomField[];
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  required: boolean;
  options?: string[]; // for select type
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  date: string;
  time: string;
  duration: number;
  businessId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  customData?: Record<string, string>;
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

export const INDUSTRIES = [
  {
    id: 'medical',
    name: 'Médico',
    defaultFields: [
      { id: 'specialty', label: 'Especialidad', type: 'select' as const, required: true, options: ['Medicina General', 'Cardiología', 'Dermatología', 'Pediatría'] },
      { id: 'reason', label: 'Motivo de consulta', type: 'textarea' as const, required: false }
    ]
  },
  {
    id: 'hotel',
    name: 'Hotelero',
    defaultFields: [
      { id: 'roomType', label: 'Tipo de habitación', type: 'select' as const, required: true, options: ['Individual', 'Doble', 'Suite', 'Familiar'] },
      { id: 'guests', label: 'Número de huéspedes', type: 'text' as const, required: true }
    ]
  },
  {
    id: 'beauty',
    name: 'Peluquería/Estética',
    defaultFields: [
      { id: 'service', label: 'Servicio', type: 'select' as const, required: true, options: ['Corte', 'Peinado', 'Coloración', 'Tratamiento'] },
      { id: 'preferences', label: 'Preferencias especiales', type: 'textarea' as const, required: false }
    ]
  },
  {
    id: 'administrative',
    name: 'Administrativo',
    defaultFields: [
      { id: 'procedure', label: 'Trámite', type: 'select' as const, required: true, options: ['Documentación', 'Consulta', 'Certificado', 'Otro'] },
      { id: 'documents', label: 'Documentos necesarios', type: 'textarea' as const, required: false }
    ]
  }
];
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppointments } from '@/hooks/useAppointments';
import { INDUSTRIES, CustomField } from '@/types';
import { Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusinessConfigFormProps {
  onSuccess?: () => void;
}

export const BusinessConfigForm: React.FC<BusinessConfigFormProps> = ({ onSuccess }) => {
  const { businessConfig, saveBusinessConfig } = useAppointments();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: businessConfig?.name || '',
    industry: businessConfig?.industry || '',
    workingHours: {
      start: businessConfig?.workingHours.start || '09:00',
      end: businessConfig?.workingHours.end || '18:00',
    },
    appointmentDuration: businessConfig?.appointmentDuration || 30,
    customFields: businessConfig?.customFields || []
  });

  const selectedIndustry = INDUSTRIES.find(ind => ind.id === formData.industry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.industry) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const config = {
      id: businessConfig?.id || `business-${Date.now()}`,
      name: formData.name,
      industry: selectedIndustry?.name || formData.industry,
      workingHours: formData.workingHours,
      appointmentDuration: formData.appointmentDuration,
      customFields: formData.customFields
    };

    saveBusinessConfig(config);
    
    toast({
      title: "Configuración guardada",
      description: "Los datos del negocio se han actualizado correctamente",
    });

    onSuccess?.();
  };

  const handleIndustryChange = (industry: string) => {
    const selectedInd = INDUSTRIES.find(ind => ind.id === industry);
    setFormData(prev => ({
      ...prev,
      industry,
      customFields: selectedInd?.defaultFields || []
    }));
  };

  const addCustomField = () => {
    const newField: CustomField = {
      id: `field-${Date.now()}`,
      label: '',
      type: 'text',
      required: false
    };
    setFormData(prev => ({
      ...prev,
      customFields: [...prev.customFields, newField]
    }));
  };

  const removeCustomField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter(field => field.id !== fieldId)
    }));
  };

  const updateCustomField = (fieldId: string, updates: Partial<CustomField>) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Negocio *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Mi Negocio"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Rubro *</Label>
              <Select value={formData.industry} onValueChange={handleIndustryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rubro" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horarios de Atención</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Hora de Inicio</Label>
              <Input
                id="start"
                type="time"
                value={formData.workingHours.start}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, start: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Hora de Fin</Label>
              <Input
                id="end"
                type="time"
                value={formData.workingHours.end}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  workingHours: { ...prev.workingHours, end: e.target.value }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duración por Turno (min)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                max="240"
                step="15"
                value={formData.appointmentDuration}
                onChange={(e) => setFormData(prev => ({ ...prev, appointmentDuration: Number(e.target.value) }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Campos Personalizados</CardTitle>
            <Button type="button" variant="outline" onClick={addCustomField} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Agregar Campo</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.customFields.map((field) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{field.type}</Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCustomField(field.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Etiqueta</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                    placeholder="Nombre del campo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select
                    value={field.type}
                    onValueChange={(type: 'text' | 'select' | 'textarea') => 
                      updateCustomField(field.id, { type })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="select">Selección</SelectItem>
                      <SelectItem value="textarea">Área de texto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {field.type === 'select' && (
                <div className="space-y-2">
                  <Label>Opciones (separadas por coma)</Label>
                  <Input
                    value={field.options?.join(', ') || ''}
                    onChange={(e) => updateCustomField(field.id, { 
                      options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                    })}
                    placeholder="Opción 1, Opción 2, Opción 3"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`required-${field.id}`}
                  checked={field.required}
                  onChange={(e) => updateCustomField(field.id, { required: e.target.checked })}
                  className="rounded border-input"
                />
                <Label htmlFor={`required-${field.id}`}>Campo obligatorio</Label>
              </div>
            </div>
          ))}

          {formData.customFields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay campos personalizados configurados</p>
              <p className="text-sm">Los campos básicos del rubro seleccionado se aplicarán automáticamente</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Guardar Configuración</span>
        </Button>
      </div>
    </form>
  );
};
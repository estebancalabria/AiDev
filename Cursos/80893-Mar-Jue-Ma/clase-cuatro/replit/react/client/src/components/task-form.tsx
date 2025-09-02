import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { InsertTask } from "@shared/schema";
import { TaskStorage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface TaskFormProps {
  onTaskCreated: () => void;
}

export function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [sprint, setSprint] = useState<"backlog" | "sprint-1" | "sprint-2" | "sprint-3">("sprint-1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "El título es requerido",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const insertTask: InsertTask = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        sprint,
      };

      TaskStorage.createTask(insertTask);
      
      // Reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setSprint("sprint-1");
      
      toast({
        title: "¡Éxito!",
        description: "Tarea creada correctamente",
      });
      
      onTaskCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la tarea",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Título de la tarea
        </label>
        <Input
          data-testid="input-task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Revisar documentación de API"
          className="w-full"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Descripción (opcional)
        </label>
        <Textarea
          data-testid="textarea-task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalles adicionales de la tarea..."
          rows={2}
          className="resize-none"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Prioridad
          </label>
          <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
            <SelectTrigger data-testid="select-task-priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baja</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sprint
          </label>
          <Select value={sprint} onValueChange={(value: "backlog" | "sprint-1" | "sprint-2" | "sprint-3") => setSprint(value)}>
            <SelectTrigger data-testid="select-task-sprint">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="sprint-1">Sprint 1</SelectItem>
              <SelectItem value="sprint-2">Sprint 2</SelectItem>
              <SelectItem value="sprint-3">Sprint 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        data-testid="button-create-task"
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isSubmitting ? "Creando..." : "Agregar Tarea"}
      </Button>
    </form>
  );
}

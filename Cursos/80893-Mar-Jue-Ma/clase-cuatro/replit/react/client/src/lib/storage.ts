import { Task, InsertTask } from "@shared/schema";
import { nanoid } from "nanoid";

const STORAGE_KEY = "taskflow-tasks";

export class TaskStorage {
  static getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Crear tarea de ejemplo por defecto
        const exampleTask: Task = {
          id: "example-task-1",
          title: "Tarea Ejemplo",
          description: "Esta es una tarea de ejemplo para mostrar cómo funciona el tablero Kanban",
          priority: "medium",
          sprint: "sprint-1",
          completed: false,
          createdAt: new Date(),
        };
        this.saveTasks([exampleTask]);
        return [exampleTask];
      }
      
      const tasks = JSON.parse(data);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error("Error loading tasks:", error);
      // En caso de error, también crear tarea de ejemplo
      const exampleTask: Task = {
        id: "example-task-1",
        title: "Tarea Ejemplo",
        description: "Esta es una tarea de ejemplo para mostrar cómo funciona el tablero Kanban",
        priority: "medium",
        sprint: "sprint-1",
        completed: false,
        createdAt: new Date(),
      };
      return [exampleTask];
    }
  }

  static saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }

  static createTask(insertTask: InsertTask): Task {
    const task: Task = {
      ...insertTask,
      id: nanoid(),
      completed: false,
      createdAt: new Date(),
    };

    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    
    return task;
  }

  static updateTask(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return null;
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    this.saveTasks(tasks);
    
    return tasks[taskIndex];
  }

  static deleteTask(id: string): boolean {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    this.saveTasks(filteredTasks);
    return true;
  }

  static toggleTaskCompletion(id: string): Task | null {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.id === id);
    
    if (!task) return null;
    
    const updates: Partial<Task> = {
      completed: !task.completed,
      completedAt: !task.completed ? new Date() : undefined,
    };
    
    return this.updateTask(id, updates);
  }
}

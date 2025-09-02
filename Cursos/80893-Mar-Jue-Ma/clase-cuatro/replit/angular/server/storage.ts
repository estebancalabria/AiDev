import { type Task, type Sprint, type InsertTask, type InsertSprint } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  getTasksBySprint(sprintId: string): Promise<Task[]>;
  getTasksByStatus(status: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;

  // Sprint operations
  getSprints(): Promise<Sprint[]>;
  getSprint(id: string): Promise<Sprint | undefined>;
  createSprint(sprint: InsertSprint): Promise<Sprint>;
  updateSprint(id: string, updates: Partial<Sprint>): Promise<Sprint | undefined>;
  deleteSprint(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private tasks: Map<string, Task> = new Map();
  private sprints: Map<string, Sprint> = new Map();

  constructor() {
    // Initialize with some default data
    this.initializeData();
  }

  private initializeData() {
    // Create a default sprint
    const now = new Date().toISOString();
    const defaultSprint: Sprint = {
      id: "sprint-1",
      name: "Sprint 1 - User Authentication",
      description: "Focus on implementing secure user login and registration system",
      status: "active",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      createdAt: now,
      updatedAt: now,
    };
    this.sprints.set(defaultSprint.id, defaultSprint);
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksBySprint(sprintId: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.sprintId === sprintId);
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.status === status);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const now = new Date().toISOString();
    const task: Task = {
      ...insertTask,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(task.id, task);
    return task;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updatedTask: Task = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Sprint operations
  async getSprints(): Promise<Sprint[]> {
    return Array.from(this.sprints.values());
  }

  async getSprint(id: string): Promise<Sprint | undefined> {
    return this.sprints.get(id);
  }

  async createSprint(insertSprint: InsertSprint): Promise<Sprint> {
    const now = new Date().toISOString();
    const sprint: Sprint = {
      ...insertSprint,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    this.sprints.set(sprint.id, sprint);
    return sprint;
  }

  async updateSprint(id: string, updates: Partial<Sprint>): Promise<Sprint | undefined> {
    const sprint = this.sprints.get(id);
    if (!sprint) return undefined;

    const updatedSprint: Sprint = {
      ...sprint,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.sprints.set(id, updatedSprint);
    return updatedSprint;
  }

  async deleteSprint(id: string): Promise<boolean> {
    // Also remove all tasks from this sprint
    const tasks = Array.from(this.tasks.values()).filter(task => task.sprintId === id);
    tasks.forEach(task => {
      this.updateTask(task.id, { sprintId: undefined });
    });
    
    return this.sprints.delete(id);
  }
}

export const storage = new MemStorage();

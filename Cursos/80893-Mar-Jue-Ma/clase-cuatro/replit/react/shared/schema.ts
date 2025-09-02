import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "El título es requerido"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  sprint: z.enum(["backlog", "sprint-1", "sprint-2", "sprint-3"]),
  completed: z.boolean(),
  createdAt: z.date(),
  completedAt: z.date().optional(),
});

export const insertTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  completedAt: true,
  completed: true,
});

export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;

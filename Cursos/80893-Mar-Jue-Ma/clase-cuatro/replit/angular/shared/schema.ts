import { z } from "zod";

export const taskStatuses = ["todo", "inprogress", "done"] as const;
export const taskPriorities = ["low", "medium", "high"] as const;
export const sprintStatuses = ["planning", "active", "completed"] as const;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(taskStatuses),
  priority: z.enum(taskPriorities),
  assignee: z.string().optional(),
  sprintId: z.string().optional(),
  storyPoints: z.number().min(1).max(21).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const sprintSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.enum(sprintStatuses),
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSprintSchema = sprintSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Task = z.infer<typeof taskSchema>;
export type Sprint = z.infer<typeof sprintSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertSprint = z.infer<typeof insertSprintSchema>;
export type TaskStatus = z.infer<typeof taskSchema>["status"];
export type TaskPriority = z.infer<typeof taskSchema>["priority"];
export type SprintStatus = z.infer<typeof sprintSchema>["status"];

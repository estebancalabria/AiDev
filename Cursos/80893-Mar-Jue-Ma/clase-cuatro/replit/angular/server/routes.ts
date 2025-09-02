import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, insertSprintSchema, taskSchema, sprintSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Task routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const sprintId = req.query.sprintId as string;
      const status = req.query.status as string;
      
      let tasks;
      if (sprintId) {
        tasks = await storage.getTasksBySprint(sprintId);
      } else if (status) {
        tasks = await storage.getTasksByStatus(status);
      } else {
        tasks = await storage.getTasks();
      }
      
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get("/api/tasks/:id", async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch task" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const updates = req.body;
      const task = await storage.updateTask(req.params.id, updates);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTask(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Sprint routes
  app.get("/api/sprints", async (req, res) => {
    try {
      const sprints = await storage.getSprints();
      res.json(sprints);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sprints" });
    }
  });

  app.get("/api/sprints/:id", async (req, res) => {
    try {
      const sprint = await storage.getSprint(req.params.id);
      if (!sprint) {
        return res.status(404).json({ message: "Sprint not found" });
      }
      res.json(sprint);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sprint" });
    }
  });

  app.post("/api/sprints", async (req, res) => {
    try {
      const validatedData = insertSprintSchema.parse(req.body);
      const sprint = await storage.createSprint(validatedData);
      res.status(201).json(sprint);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sprint data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create sprint" });
    }
  });

  app.patch("/api/sprints/:id", async (req, res) => {
    try {
      const updates = req.body;
      const sprint = await storage.updateSprint(req.params.id, updates);
      if (!sprint) {
        return res.status(404).json({ message: "Sprint not found" });
      }
      res.json(sprint);
    } catch (error) {
      res.status(500).json({ message: "Failed to update sprint" });
    }
  });

  app.delete("/api/sprints/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSprint(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Sprint not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete sprint" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

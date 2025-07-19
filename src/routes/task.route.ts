import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/task.controller";

const taskRouter = Router();

// All routes require authentication
taskRouter.use(authMiddleware);

// Task routes using authenticated user context
taskRouter.get("/", getTasks); // Get current user's tasks
taskRouter.post("/", createTask); // Create task for current user
taskRouter.get("/:id", getTask); // Get specific task (if user has access)
taskRouter.put("/:id", updateTask); // Update task (if user has access)
taskRouter.delete("/:id", deleteTask); // Delete task (if user is creator)

export { taskRouter };

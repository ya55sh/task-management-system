import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
	createProject,
	getProject,
	updateProject,
	deleteProject,
	getProjects,
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/create", authMiddleware, createProject);
projectRouter.get("/:id", authMiddleware, getProject);
projectRouter.get("/", authMiddleware, getProjects);
projectRouter.put("/:id", authMiddleware, updateProject);
projectRouter.delete("/:id", authMiddleware, deleteProject);

export { projectRouter };

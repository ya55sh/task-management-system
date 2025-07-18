import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const taskRouter = Router();

taskRouter.get("/", authMiddleware, () => {});
taskRouter.post("/", authMiddleware, () => {});
taskRouter.get("/:id", authMiddleware, () => {});
taskRouter.put("/:id", authMiddleware, () => {});
taskRouter.delete("/:id", authMiddleware, () => {});

export { taskRouter };

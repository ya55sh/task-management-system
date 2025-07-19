import { Router } from "express";
import { userRouter } from "./user.route";
import { taskRouter } from "./task.route";
import { projectRouter } from "./project.route";

const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/task", taskRouter);
indexRouter.use("/project", projectRouter);

export { indexRouter };

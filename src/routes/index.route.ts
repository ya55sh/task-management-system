import { Router } from "express";
import { userRouter } from "./user.route";
import { taskRouter } from "./task.route";
import { projectRouter } from "./project.route";
import { collaborationRouter } from "./collaboration.route";

const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/task", taskRouter);
indexRouter.use("/project", projectRouter);
indexRouter.use("/collaboration", collaborationRouter);

export { indexRouter };

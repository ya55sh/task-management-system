import { Router } from "express";
import { userRouter } from "./user.route";
import { taskRouter } from "./task.route";

const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/task", taskRouter);

export { indexRouter };

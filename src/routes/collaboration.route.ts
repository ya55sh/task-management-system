import { Router } from "express";
import { upload } from "../middlewares/attachment.middlware";

const collaborationRouter = Router();

collaborationRouter.get("/:id", () => {});
collaborationRouter.post("/", upload.array("attachment"), () => {});
collaborationRouter.put("/:id", upload.array("attachment"), () => {});
collaborationRouter.delete("/:id", () => {});

export { collaborationRouter };

import { Router } from "express";
import { upload } from "../middlewares/attachment.middlware";
import { addCollaboration, getCollaborations, updateCollaboration } from "../controllers/collaboration.controller";

const collaborationRouter = Router();

collaborationRouter.get("/:taskId", getCollaborations);
collaborationRouter.post("/", upload.array("attachment"), addCollaboration);
collaborationRouter.put("/:collaborationId", upload.array("attachment"), updateCollaboration);

export { collaborationRouter };

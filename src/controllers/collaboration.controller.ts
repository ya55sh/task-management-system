import { Request, Response } from "express";
import { Collaboration } from "../db/entity/collaboration";
import { AppDataSource } from "../db/model";
import { CollaborationTag } from "../db/entity/collaboration_tag";
import { CollaborationAttachment } from "../db/entity/collaboration_attachment";

const addCollaboration = async (req: Request, res: Response) => {
	try {
		let { taskId, userId, taggedUserId, message, collaborationTags } = req.body;

		const collaboration = await AppDataSource.getRepository(Collaboration).save({
			task: { id: taskId } as any,
			user: { id: userId } as any,
			message: message,
		});

		if (collaborationTags.length > 0) {
			const collabTags = await AppDataSource.getRepository(CollaborationTag).save(
				collaborationTags.map((tag: any) => ({
					collaboration: { id: collaboration.id } as any,
					tagged_by_user: { id: userId } as any,
					tagged_user: { id: taggedUserId } as any,
				}))
			);
			collaboration.collaboration_tags = collabTags;
			await AppDataSource.getRepository(Collaboration).save(collaboration);
		}

		res.status(201).json({ message: "Collaboration added successfully", collaboration: collaboration });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error while adding collaboration" });
	}
};

export { addCollaboration };

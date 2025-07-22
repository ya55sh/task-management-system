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

const getCollaborations = async (req: Request, res: Response) => {
	try {
		const { taskId } = req.params;
		const collaborations = await AppDataSource.getRepository(Collaboration).find({
			where: { task: { id: Number(taskId) } },
			relations: { user: true, collaboration_tags: true },
		});
		res.status(200).json({ message: "Collaborations fetched successfully", collaborations: collaborations });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error while getting collaborations" });
	}
};

const updateCollaboration = async (req: Request, res: Response) => {
	try {
		const { collaborationId } = req.params;
		const { message, collaborationTags } = req.body;

		//fetch collaboration
		const collaboration = await AppDataSource.getRepository(Collaboration).findOne({
			where: { id: Number(collaborationId) },
		});
		if (!collaboration) {
			return res.status(404).json({ message: "Collaboration not found" });
		}
		//update message after collaboration is fetched
		collaboration.message = message;
		await AppDataSource.getRepository(Collaboration).save(collaboration);

		const userId = req.user.id;

		//update collaboration tags by iteration over collaborationTags
		if (collaborationTags.length > 0) {
			const collabTags = await AppDataSource.getRepository(CollaborationTag).save(
				collaborationTags.map((tag: any) => ({
					collaboration: { id: collaborationId } as any,
					tagged_by_user: { id: userId } as any,
					tagged_user: { id: tag.taggedUserId } as any,
				}))
			);
			collaboration.collaboration_tags = collabTags;

			//finally save the collaboration
			await AppDataSource.getRepository(Collaboration).save(collaboration);
		} else {
			//delete all collaboration tags if collaborationTags is empty
			await AppDataSource.getRepository(CollaborationTag).delete({ collaboration: { id: Number(collaborationId) } });
			await AppDataSource.getRepository(Collaboration).save(collaboration);
		}
		res.status(200).json({ message: "Collaboration updated successfully", collaboration: collaboration });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error while updating collaboration" });
	}
};

export { addCollaboration, getCollaborations, updateCollaboration };

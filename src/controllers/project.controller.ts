import { Request, Response } from "express";
import { AppDataSource } from "../db/model";
import { Project } from "../db/entity/project";
import { User } from "../db/entity/user";

const createProject = async (req: Request, res: Response) => {
	try {
		const { title } = req.body;
		let user = req.user;

		if (!title) {
			return res.status(400).json({ message: "Title is required" });
		}

		const userRepository = AppDataSource.getRepository(User);
		user = await userRepository.findOne({ where: { id: user.id } });

		if (user.role !== `${process.env.ADMIN_ROLE}`) {
			return res.status(403).json({ message: "You are not authorized to create a project" });
		}

		const projectRepository = AppDataSource.getRepository(Project);
		const project = projectRepository.create({
			title,
			created_by: user.id,
		});
		await projectRepository.save(project);
		res.status(201).json({ message: "Project created successfully", project });
	} catch (error) {
		res.status(500).json({ message: "Error occurred while creating project" });
	}
};

const getProject = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const projectRepository = AppDataSource.getRepository(Project);
		const project = await projectRepository.findOne({ where: { id: Number(id) } });

		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		res.status(200).json({ message: "Project fetched successfully", project });
	} catch (error) {
		res.status(500).json({ message: "Error occurred while fetching project" });
	}
};

const getProjects = async (req: Request, res: Response) => {
	try {
		const user = req.user;
		const projectRepository = AppDataSource.getRepository(Project);
		const projects = await projectRepository.find({ where: { created_by: user.id } });

		if (!projects) {
			return res.status(404).json({ message: "No projects found" });
		}

		res.status(200).json({ message: "Projects fetched successfully", projects });
	} catch (error) {
		res.status(500).json({ message: "Error occurred while fetching projects" });
	}
};

const updateProject = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { title } = req.body;
		const projectRepository = AppDataSource.getRepository(Project);
		const project = await projectRepository.findOne({ where: { id: Number(id) } });

		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		project.title = title;
		await projectRepository.save(project);

		res.status(200).json({ message: "Project updated successfully", project });
	} catch (error) {
		res.status(500).json({ message: "Error occurred while updating project" });
	}
};

const deleteProject = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const projectRepository = AppDataSource.getRepository(Project);
		const project = await projectRepository.findOne({ where: { id: Number(id) } });
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}
		await projectRepository.delete(project.id);
		res.status(200).json({ message: "Project deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error occurred while deleting project" });
	}
};

export { createProject, getProject, getProjects, updateProject, deleteProject };

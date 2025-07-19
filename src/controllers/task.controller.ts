import { Request, Response } from "express";
import { AppDataSource } from "../db/model";
import { Task, TaskStatus } from "../db/entity/task";
import { Project } from "../db/entity/project";
import { User } from "../db/entity/user";

const createTask = async (req: Request, res: Response) => {
	try {
		const { title, description, status, projectId, assignedToId } = req.body;
		const userId = req.user.id; // From authenticated user

		if (!title || !description || !projectId) {
			return res.status(400).json({ message: "Title, description, and project ID are required" });
		}

		const projectRepository = AppDataSource.getRepository(Project);
		const project = await projectRepository.findOne({ where: { id: projectId } });
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id: userId } });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const assignedToUser = await userRepository.findOne({ where: { id: assignedToId } });
		if (!assignedToUser) {
			return res.status(404).json({ message: "Assigned to user not found" });
		}

		const taskRepository = AppDataSource.getRepository(Task);

		// Create task with authenticated user as creator
		const task = taskRepository.create({
			title,
			description,
			status: status || TaskStatus.STARTED,
			project: { id: projectId },
			created_by: { id: userId },
			assigned_to: { id: assignedToId || userId }, // Default to creator if not assigned
		});

		const savedTask = await taskRepository.save(task);

		res.status(201).json({ message: "Task created successfully", task: savedTask });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while creating task" });
	}
};

const getTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user.id; // From authenticated user

		const taskRepository = AppDataSource.getRepository(Task);

		// Get task only if user is creator or assigned
		const task = await taskRepository.findOne({
			where: {
				id: Number(id),
				// User must be either creator or assigned
			},
			relations: ["project", "assigned_to", "created_by", "updated_by"],
		});

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Check if user has access to this task
		if (task.created_by.id !== userId && task.assigned_to.id !== userId) {
			return res.status(403).json({ message: "Access denied" });
		}

		res.status(200).json({ task });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while fetching task" });
	}
};

const getTasks = async (req: Request, res: Response) => {
	try {
		const userId = req.user.id; // From authenticated user
		const { status, projectId } = req.query;

		const taskRepository = AppDataSource.getRepository(Task);

		// Build query to get tasks where user is either creator or assigned
		const queryBuilder = taskRepository
			.createQueryBuilder("task")
			.leftJoinAndSelect("task.project", "project")
			.leftJoinAndSelect("task.assigned_to", "assigned_to")
			.leftJoinAndSelect("task.created_by", "created_by")
			.where("task.created_by.id = :userId OR task.assigned_to.id = :userId", { userId });

		// Add filters if provided
		if (status) {
			queryBuilder.andWhere("task.status = :status", { status });
		}
		if (projectId) {
			queryBuilder.andWhere("task.project.id = :projectId", { projectId });
		}

		const tasks = await queryBuilder.getMany();

		res.status(200).json({ tasks });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while fetching tasks" });
	}
};

const updateTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const userId = req.user.id; // From authenticated user

		const taskRepository = AppDataSource.getRepository(Task);

		// Get task only if user is creator or assigned
		const task = await taskRepository.findOne({
			where: { id: Number(id) },
			relations: ["created_by", "assigned_to"],
		});

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Check if user has access to this task
		if (task.created_by.id !== userId && task.assigned_to.id !== userId) {
			return res.status(403).json({ message: "Access denied" });
		}

		// Update task and set updated_by
		Object.assign(task, updates);
		task.updated_by = { id: userId } as any;

		const updatedTask = await taskRepository.save(task);

		res.status(200).json({ message: "Task updated successfully", task: updatedTask });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while updating task" });
	}
};

const deleteTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user.id; // From authenticated user

		const taskRepository = AppDataSource.getRepository(Task);

		// Get task only if user is creator
		const task = await taskRepository.findOne({
			where: { id: Number(id) },
			relations: ["created_by"],
		});

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Only creator can delete the task
		if (task.created_by.id !== userId) {
			return res.status(403).json({ message: "Only task creator can delete the task" });
		}

		await taskRepository.delete(task.id);

		res.status(200).json({ message: "Task deleted successfully" });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while deleting task" });
	}
};

export { createTask, getTasks, getTask, updateTask, deleteTask };

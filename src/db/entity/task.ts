import { User } from "./user";
import { Project } from "./project";
import { Collaboration } from "./collaboration";
import { TaskLog } from "./task_log";
import { Notification } from "./notification";

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from "typeorm";

export enum TaskStatus {
	BACKLOG = "backlog",
	STARTED = "started",
	ONGOING = "ongoing",
	TESTING = "testing",
	COMPLETED = "completed",
	DONE = "done",
}

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Project, (project) => project.tasks, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "project_id" })
	project!: Project;

	@Column({ nullable: false })
	title!: string;

	@Column({ nullable: false })
	description!: string;

	@Column({ type: "enum", enum: TaskStatus, default: TaskStatus.BACKLOG })
	status!: TaskStatus;

	@ManyToOne(() => User, (user) => user.assigned_task, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "assigned_to" })
	assigned_to!: User;

	@ManyToOne(() => User, (user) => user.created_task, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "created_by" })
	created_by!: User;

	@ManyToOne(() => User, (user) => user.updated_task, { onDelete: "CASCADE" })
	@JoinColumn({ name: "updated_by" })
	updated_by!: User;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(() => Collaboration, (collaborations) => collaborations.task)
	collaborations!: Collaboration[];

	@OneToMany(() => TaskLog, (taskLog) => taskLog.task)
	logs!: TaskLog[];

	@OneToMany(() => Notification, (notification) => notification.task)
	notifications!: Notification[];
}

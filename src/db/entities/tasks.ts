import { Users } from "./users";
import { Projects } from "./projects";
import { Collaborations } from "./collaborations";
import { TaskLogs } from "./task_logs";
import { Notifications } from "./notifications";

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
export class Tasks {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Projects, (projects) => projects.tasks, { nullable: false })
	@JoinColumn({ name: "project_id" })
	project!: Projects;

	@Column({ nullable: false })
	title!: string;

	@Column({ nullable: false })
	description!: string;

	@Column({ type: "enum", enum: TaskStatus, default: TaskStatus.BACKLOG })
	status!: TaskStatus;

	@ManyToOne(() => Users, (user) => user.assigned_task, { nullable: false })
	@JoinColumn({ name: "assigned_to" })
	assigned_to!: Users;

	@ManyToOne(() => Users, (user) => user.created_task, { nullable: false })
	@JoinColumn({ name: "created_by" })
	created_by!: Users;

	@ManyToOne(() => Users, (user) => user.updated_task)
	@JoinColumn({ name: "updated_by" })
	updated_by!: Users;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(() => Collaborations, (collaborations) => collaborations.task)
	collaborations!: Collaborations[];

	@OneToMany(() => TaskLogs, (taskLogs) => taskLogs.task)
	logs!: TaskLogs[];

	@OneToMany(() => Notifications, (notification) => notification.task)
	notifications!: Notifications[];
}

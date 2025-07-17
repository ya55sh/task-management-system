import { Task } from "./task";
import { User } from "./user";

export enum TaskLogAction {
	STATUS = "status",
	ASSIGNER = "assign",
	ASSIGNEE = "assignee",
	COMMENT = "comment",
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("task_log")
export class TaskLog {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Task, (task) => task.logs, { nullable: false, onDelete: "CASCADE" })
	task!: Task;

	@Column({ type: "enum", enum: TaskLogAction, nullable: false })
	action!: TaskLogAction;

	@Column()
	old_value!: string;

	@Column()
	new_value!: string;

	@ManyToOne(() => User, (user) => user.task_logs, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "created_by" })
	created_by!: User;

	@CreateDateColumn()
	created_at!: Date;
}

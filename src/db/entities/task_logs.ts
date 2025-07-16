import { Tasks } from "./tasks";
import { Users } from "./users";

export enum TaskLogAction {
	STATUS = "status",
	ASSIGNER = "assign",
	ASSIGNEE = "assignee",
	COMMENT = "comment",
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("task_logs")
export class TaskLogs {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Tasks, (task) => task.logs, { nullable: false })
	task!: Tasks;

	@Column({ type: "enum", enum: TaskLogAction, nullable: false })
	action!: TaskLogAction;

	@Column()
	old_value!: string;

	@Column()
	new_value!: string;

	@ManyToOne(() => Users, (user) => user.task_logs, { nullable: false })
	@JoinColumn({ name: "created_by" })
	created_by!: Users;

	@CreateDateColumn()
	created_at!: Date;
}

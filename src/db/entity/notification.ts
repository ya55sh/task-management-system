import { Task } from "./task";
import { User } from "./user";
//('assignment','mention','comment','status_change');
enum NotificationType {
	ASSIGNMENT = "assignment",
	COMMENT = "comment",
	MENTION = "mention",
	STATUS_CHANGE = "status_change",
}

import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Notification {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Task, (task) => task.notifications, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "task_id" })
	task!: Task;

	@ManyToOne(() => User, (user) => user.from_notifications, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	from_user!: User;

	@ManyToOne(() => User, (user) => user.to_notifications, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "to_user_id" })
	to_user!: User;

	@Column({ type: "enum", enum: NotificationType, nullable: false })
	notification_type!: NotificationType;

	@Column({ nullable: false })
	link_to!: string;

	@Column({ type: "boolean", default: false })
	is_read!: boolean;

	@Column()
	message!: string;

	@CreateDateColumn()
	created_at!: Date;
}

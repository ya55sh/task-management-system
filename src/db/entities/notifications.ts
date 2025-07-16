import { Tasks } from "./tasks";
import { Users } from "./users";
//('assignment','mention','comment','status_change');
enum NotificationType {
	ASSIGNMENT = "assignment",
	COMMENT = "comment",
	MENTION = "mention",
	STATUS_CHANGE = "status_change",
}

import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Notifications {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Tasks, (task) => task.notifications, { nullable: false })
	@JoinColumn({ name: "task_id" })
	task!: Tasks;

	@ManyToOne(() => Users, (user) => user.from_notifications, { nullable: false })
	@JoinColumn({ name: "user_id" })
	from_user!: Users;

	@ManyToOne(() => Users, (user) => user.to_notifications, { nullable: false })
	@JoinColumn({ name: "to_user_id" })
	to_user!: Users;

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

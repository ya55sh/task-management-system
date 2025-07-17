import { Task } from "./task";
import { User } from "./user";
import { CollaborationTag } from "./collaboration_tag";
import { CollaborationAttachment } from "./collaboration_attachment";

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity({ name: "collaboration" })
export class Collaboration {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Task, (tasks) => tasks.collaborations, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "task_id" })
	task!: Task;

	@ManyToOne(() => User, (users) => users.collaborations, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column({ type: "text", nullable: true })
	message!: string | null;

	@Column({ type: "boolean", default: false })
	attachment!: boolean;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at!: Date;

	@OneToMany(() => CollaborationTag, (collaborationTag) => collaborationTag.collaboration)
	collaboration_tags!: CollaborationTag[];

	@OneToMany(() => CollaborationAttachment, (collaborationAttachment) => collaborationAttachment.collaboration)
	collaboration_attachments!: CollaborationAttachment[];
}

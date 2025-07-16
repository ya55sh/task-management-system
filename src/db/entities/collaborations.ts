import { Tasks } from "./tasks";
import { Users } from "./users";
import { CollaborationTags } from "./collaboration_tags";
import { CollaborationAttachments } from "./collaboration_attachments";

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity({ name: "collaborations" })
export class Collaborations {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Tasks, (tasks) => tasks.collaborations, { nullable: false })
	@JoinColumn({ name: "task_id" })
	task!: Tasks;

	@ManyToOne(() => Users, (users) => users.collaborations, { nullable: false })
	@JoinColumn({ name: "user_id" })
	user!: Users;

	@Column({ type: "text", nullable: true })
	message!: string | null;

	@Column({ type: "boolean", default: false })
	attachment!: boolean;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at!: Date;

	@OneToMany(() => CollaborationTags, (collaborationTag) => collaborationTag.collaboration)
	collaboration_tags!: CollaborationTags[];

	@OneToMany(() => CollaborationAttachments, (collaborationAttachment) => collaborationAttachment.collaboration)
	collaboration_attachments!: CollaborationAttachments[];
}

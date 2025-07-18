import { Collaboration } from "./collaboration";
import { User } from "./user";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity({ name: "collaboration_attachment" })
export class CollaborationAttachment {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Collaboration, (collaboration) => collaboration.collaboration_attachments, {
		nullable: false,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "collaboration_id" })
	collaboration!: Collaboration;

	@ManyToOne(() => User, (user) => user.collaboration_attachments, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "uploaded_by" })
	uploaded_by!: User;

	@Column()
	attachment_url!: string;

	@CreateDateColumn()
	created_at!: Date;
}

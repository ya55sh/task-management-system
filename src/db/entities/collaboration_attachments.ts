import { Collaborations } from "./collaborations";
import { Users } from "./users";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity({ name: "collaboration_attachments" })
export class CollaborationAttachments {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Collaborations, (collaboration) => collaboration.collaboration_attachments, { nullable: false })
	@JoinColumn({ name: "collaboration_id" })
	collaboration!: Collaborations;

	@ManyToOne(() => Users, (user) => user.collaboration_attachments, { nullable: false })
	@JoinColumn({ name: "uploaded_by" })
	uploaded_by!: Users;

	@Column()
	attachment_url!: string;

	@CreateDateColumn()
	created_at!: Date;
}

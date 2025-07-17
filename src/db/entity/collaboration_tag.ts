import { Collaboration } from "./collaboration";
import { User } from "./user";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "collaboration_tag" })
export class CollaborationTag {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Collaboration, (collaboration) => collaboration.collaboration_tags, {
		nullable: false,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "collaboration_id" })
	collaboration!: Collaboration;

	@ManyToOne(() => User, (user) => user.tags_created_by_user, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "tagged_by_user_id" })
	tagged_by_user!: User;

	@ManyToOne(() => User, (users) => users.tags_received_by_user, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "tagged_user_id" })
	tagged_user!: User;

	@CreateDateColumn()
	created_at!: Date;
}

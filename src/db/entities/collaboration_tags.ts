import { Collaborations } from "./collaborations";
import { Users } from "./users";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "collaboration_tags" })
export class CollaborationTags {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Collaborations, (collaboration) => collaboration.collaboration_tags, { nullable: false })
	@JoinColumn({ name: "collaboration_id" })
	collaboration!: Collaborations;

	@ManyToOne(() => Users, (user) => user.tags_created_by_user, { nullable: false })
	@JoinColumn({ name: "tagged_by_user_id" })
	tagged_by_user!: Users;

	@ManyToOne(() => Users, (users) => users.tags_received_by_user, { nullable: false })
	@JoinColumn({ name: "tagged_user_id" })
	tagged_user!: Users;

	@CreateDateColumn()
	created_at!: Date;
}

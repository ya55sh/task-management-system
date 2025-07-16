import { Users } from "./users";
import { UserTeams } from "./user_teams";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	OneToMany,
	JoinColumn,
} from "typeorm";

@Entity()
export class Teams {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@ManyToOne(() => Users, (user) => user.managed_teams, { nullable: false })
	@JoinColumn({ name: "managed_by" })
	managed_by!: Users;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at!: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	updated_at!: Date;

	@OneToMany(() => UserTeams, (userteams) => userteams.team)
	user_teams!: UserTeams[];
}

import { User } from "./user";
import { UserTeam } from "./user_team";
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
export class Team {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@ManyToOne(() => User, (user) => user.managed_teams, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "managed_by" })
	managed_by!: User;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at!: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	updated_at!: Date;

	@OneToMany(() => UserTeam, (userteam) => userteam.team)
	user_teams!: UserTeam[];
}

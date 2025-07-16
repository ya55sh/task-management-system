import { Users } from "./users";
import { Teams } from "./teams";
import { PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("user_teams")
export class UserTeams {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Teams, (team) => team.user_teams)
	@JoinColumn({ name: "team_id" })
	team!: Teams;

	@ManyToOne(() => Users, (user) => user.user_teams, { nullable: false })
	@JoinColumn({ name: "member_id" })
	member!: Users;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	joined_at!: Date;
}

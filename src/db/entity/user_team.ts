import { User } from "./user";
import { Team } from "./team";
import { PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("user_team")
export class UserTeam {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Team, (team) => team.user_teams, { onDelete: "CASCADE" })
	@JoinColumn({ name: "team_id" })
	team!: Team;

	@ManyToOne(() => User, (user) => user.user_teams, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "member_id" })
	member!: User;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	joined_at!: Date;
}

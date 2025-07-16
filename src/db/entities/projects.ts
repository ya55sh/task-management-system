import { Users } from "./users";
import { Tasks } from "./tasks";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";

@Entity()
export class Projects {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	title!: string;

	@ManyToOne(() => Users, (user) => user.created_projects, { nullable: false })
	@JoinColumn({ name: "created_by" })
	created_by!: Users;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(() => Tasks, (task) => task.project)
	tasks!: Tasks[];
}

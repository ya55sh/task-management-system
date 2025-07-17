import { User } from "./user";
import { Task } from "./task";
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
export class Project {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	title!: string;

	@ManyToOne(() => User, (user) => user.created_projects, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "created_by" })
	created_by!: User;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(() => Task, (task) => task.project)
	tasks!: Task[];
}

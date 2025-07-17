import { User } from "./user";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";

@Entity("user_token")
export class UserToken {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	token!: string;

	@ManyToOne(() => User, (user) => user.user_tokens, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user!: User;

	@CreateDateColumn()
	createdAt!: Date;
}

import { User } from "./user";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity("user_email_token")
export class UserEmailToken {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	token!: string;

	@ManyToOne(() => User, (user) => user.user_email_tokens, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user!: User;

	@CreateDateColumn()
	createdAt!: Date;
}

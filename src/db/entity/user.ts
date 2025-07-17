import { Task } from "./task";
import { Team } from "./team";
import { UserTeam } from "./user_team";
import { Project } from "./project";
import { Collaboration } from "./collaboration";
import { CollaborationTag } from "./collaboration_tag";
import { CollaborationAttachment } from "./collaboration_attachment";
import { TaskLog } from "./task_log";
import { Notification } from "./notification";
import { UserToken } from "./user_token";
import { UserEmailToken } from "./user_email_token";

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";

export enum UserRole {
	USER = "user",
	ADMIN = "admin",
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	firstName!: string;

	@Column({ nullable: false })
	lastName!: string;

	@Column({ unique: true, nullable: false })
	email!: string;

	@Column({ nullable: false })
	password!: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.USER })
	role!: UserRole;

	@CreateDateColumn()
	created_at!: Date;

	@OneToMany(() => Task, (task) => task.assigned_to)
	assigned_task!: Task[];

	@OneToMany(() => Task, (task) => task.created_by)
	created_task!: Task[];

	@OneToMany(() => Task, (task) => task.updated_by)
	updated_task!: Task[];

	@OneToMany(() => Team, (team) => team.managed_by)
	managed_teams!: Team[];

	@OneToMany(() => UserTeam, (userteam) => userteam.member)
	user_teams!: UserTeam[];

	@OneToMany(() => Project, (project) => project.created_by)
	created_projects!: Project[];

	@OneToMany(() => Collaboration, (collaboration) => collaboration.user)
	collaborations!: Collaboration[];

	@OneToMany(() => CollaborationTag, (collaborationTag) => collaborationTag.tagged_by_user)
	tags_created_by_user!: CollaborationTag[];

	@OneToMany(() => CollaborationTag, (collaborationTag) => collaborationTag.tagged_user)
	tags_received_by_user!: CollaborationTag[];

	@OneToMany(() => CollaborationAttachment, (attachment) => attachment.uploaded_by)
	collaboration_attachments!: CollaborationAttachment[];

	@OneToMany(() => TaskLog, (taskLog) => taskLog.created_by)
	task_logs!: TaskLog[];

	@OneToMany(() => Notification, (notification) => notification.from_user)
	from_notifications!: Notification[];

	@OneToMany(() => Notification, (notification) => notification.to_user)
	to_notifications!: Notification[];

	@OneToMany(() => UserToken, (userToken) => userToken.user)
	user_tokens!: UserToken[];

	@OneToMany(() => UserEmailToken, (userEmailToken) => userEmailToken.user)
	user_email_tokens!: UserEmailToken[];
}

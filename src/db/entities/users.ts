import { Tasks } from "./tasks";
import { Teams } from "./teams";
import { UserTeams } from "./user_teams";
import { Projects } from "./projects";
import { Collaborations } from "./collaborations";
import { CollaborationTags } from "./collaboration_tags";
import { CollaborationAttachments } from "./collaboration_attachments";
import { TaskLogs } from "./task_logs";
import { Notifications } from "./notifications";

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";

export enum UserRole {
	USER = "user",
	ADMIN = "admin",
}

@Entity()
export class Users {
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

	@OneToMany(() => Tasks, (task) => task.assigned_to)
	assigned_task!: Tasks[];

	@OneToMany(() => Tasks, (task) => task.created_by)
	created_task!: Tasks[];

	@OneToMany(() => Tasks, (task) => task.updated_by)
	updated_task!: Tasks[];

	@OneToMany(() => Teams, (team) => team.managed_by)
	managed_teams!: Teams[];

	@OneToMany(() => UserTeams, (userteams) => userteams.member)
	user_teams!: UserTeams[];

	@OneToMany(() => Projects, (project) => project.created_by)
	created_projects!: Projects[];

	@OneToMany(() => Collaborations, (collaboration) => collaboration.user)
	collaborations!: Collaborations[];

	@OneToMany(() => CollaborationTags, (collaborationTag) => collaborationTag.tagged_by_user)
	tags_created_by_user!: CollaborationTags[];

	@OneToMany(() => CollaborationTags, (collaborationTag) => collaborationTag.tagged_user)
	tags_received_by_user!: CollaborationTags[];

	@OneToMany(() => CollaborationAttachments, (attachment) => attachment.uploaded_by)
	collaboration_attachments!: CollaborationAttachments[];

	@OneToMany(() => TaskLogs, (taskLog) => taskLog.created_by)
	task_logs!: TaskLogs[];

	@OneToMany(() => Notifications, (notification) => notification.from_user)
	from_notifications!: Notifications[];

	@OneToMany(() => Notifications, (notification) => notification.to_user)
	to_notifications!: Notifications[];
}

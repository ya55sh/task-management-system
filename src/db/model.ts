import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task";
import { User } from "./entity/user";
import { Collaboration } from "./entity/collaboration";
import { TaskLog } from "./entity/task_log";
import { CollaborationTag } from "./entity/collaboration_tag";
import { Project } from "./entity/project";
import { Notification } from "./entity/notification";
import { Team } from "./entity/team";
import { UserTeam } from "./entity/user_team";
import { CollaborationAttachment } from "./entity/collaboration_attachment";
import { UserToken } from "./entity/user_token";
import { UserEmailToken } from "./entity/user_email_token";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "root",
	database: process.env.DB_NAME || "test",
	synchronize: true,
	logging: true,
	entities: [
		User,
		Task,
		Collaboration,
		TaskLog,
		CollaborationTag,
		Project,
		Notification,
		Team,
		UserTeam,
		CollaborationAttachment,
		UserToken,
		UserEmailToken,
	],
	subscribers: [],
	migrations: [],
});

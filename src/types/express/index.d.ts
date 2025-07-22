import type { User } from "../../db/entity/user";
import "./types/express";

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

export {};

import type { User } from "../../db/entity/user";

declare global {
	namespace Express {
		interface Request {
			user: any;
		}
	}
}

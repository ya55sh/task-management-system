import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../db/model";
import { UserToken } from "../db/entity/user_token";
import { jwtVerify } from "../utils/token.util";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const treq = req as any;
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "No token provided" });
		}

		const token = authHeader.split(" ")[1];
		console.log("token", token);
		let decoded;
		try {
			decoded = jwtVerify(token);
		} catch (err) {
			return res.status(401).json({ message: "Invalid or expired token" });
		}

		// Check if token exists in DB (for logout/invalidation support)
		const userTokenRepository = AppDataSource.getRepository(UserToken);
		console.log("I HAVE REACHED HERE");
		const userToken = await userTokenRepository.findOne({
			where: { token },
			relations: ["user"],
		});
		console.log("userToken", userToken);
		console.log("I HAVE REACHED HERE TOO");
		if (!userToken || !userToken.user) {
			return res.status(401).json({ message: "Invalid token" });
		}

		treq["user"] = userToken.user;
		console.log("from auth middleware hee hee", treq.user);
		next();
	} catch (error) {
		return res.status(500).json({ message: "Authentication failed", error: error });
	}
};

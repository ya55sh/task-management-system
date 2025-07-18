import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "../utils/user_schema.util";

function userRegisterValidationMiddleware(req: Request, res: Response, next: NextFunction) {
	const schema = registerSchema();
	const result = schema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ message: "Invalid request body", error: result.error.message });
	}
	next();
}

function userLoginValidationMiddleware(req: Request, res: Response, next: NextFunction) {
	const schema = loginSchema();
	const result = schema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ message: "Invalid request body", error: result.error.message });
	}
	next();
}

export { userRegisterValidationMiddleware, userLoginValidationMiddleware };

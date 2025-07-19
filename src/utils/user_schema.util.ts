import { z } from "zod";

function registerSchema() {
	return z.object({
		firstName: z
			.string()
			.min(3)
			.regex(/^[a-zA-Z]+$/),
		lastName: z
			.string()
			.min(3)
			.regex(/^[a-zA-Z]+$/),
		email: z.email(),
		password: z.string().min(8),
	});
}

function loginSchema() {
	return z.object({
		email: z.email(),
		password: z.string().min(8),
	});
}

export { registerSchema, loginSchema };

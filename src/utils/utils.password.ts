import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS || 10;

export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, saltRounds);
}

export function comparePassword(password: string, hash: string): boolean {
	return bcrypt.compareSync(password, hash);
}

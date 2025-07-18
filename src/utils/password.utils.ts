import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

export async function hashPassword(password: string): Promise<string> {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to hash password");
	}
}

export function comparePassword(password: string, hash: string): boolean {
	try {
		return bcrypt.compareSync(password, hash);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to compare password");
	}
}

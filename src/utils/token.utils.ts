import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "default-secret";

export function jwtSign(payload: any, time: string | number) {
	return jwt.sign(payload, jwtSecret, { expiresIn: time as any });
}

export function jwtVerify(token: string) {
	return jwt.verify(token, jwtSecret);
}

import "dotenv/config";
import { Request, Response } from "express";
import { User } from "../db/entity/user";
import { UserToken } from "../db/entity/user_token";
import { UserEmailToken } from "../db/entity/user_email_token";
import { AppDataSource } from "../db/model";

import { hashPassword, comparePassword } from "../utils/utils.password";
import { jwtSign, jwtVerify } from "../utils/utils.token";
import { sendResetPasswordEmail } from "../utils/utils.mail";

const registerUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ message: "First name, last name, email and password are required" });
		}

		let user = { firstName, lastName, email, password };

		const hash = hashPassword(password);

		const userRepository = AppDataSource.getRepository(User);
		user = await userRepository.save({ firstName, lastName, email, password: hash });

		res.status(201).json({ message: "User registered successfully", user });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while registering user" });
	}
};

const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const isPasswordValid = comparePassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const token = jwtSign(
			{ user: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
			process.env.JWT_SESSION_TIME || "1h"
		);

		const userTokenRepository = AppDataSource.getRepository(UserToken);
		await userTokenRepository.save({ token, user: user });

		res.status(200).json({ message: "User logged in successfully", user, token });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while logging in" });
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const userTokenRepository = AppDataSource.getRepository(UserToken);
		await userTokenRepository.delete({ token });

		res.status(200).json({ message: "User logged out successfully" });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while logging out" });
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id || req.query.id;
		let user;

		const userRepository = AppDataSource.getRepository(User);

		if (userId) {
			user = await userRepository.findOne({ where: { id: Number(userId) } });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
		} else {
			const token = req.headers.authorization?.split(" ")[1];

			if (!token) {
				return res.status(401).json({ message: "Unauthorized" });
			}

			const decoded = jwtVerify(token);

			if (!decoded) {
				return res.status(401).json({ message: "Unauthorized" });
			}
			const userTokenRepository = AppDataSource.getRepository(UserToken);
			const userToken = await userTokenRepository.findOne({
				where: { token },
				relations: ["user"],
			});
			if (!userToken || !userToken.user) {
				return res.status(401).json({ message: "Invalid token" });
			}
			user = userToken.user;
		}

		// Remove sensitive info
		const { password, ...userData } = user;
		res.status(200).json({ user: userData });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while fetching user" });
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id || req.query.id;
		const { firstName, lastName, email, password } = req.body;

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id: Number(userId) } });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const updatedUser = await userRepository.save({ ...user, firstName, lastName, email, password });

		res.status(200).json({ message: "User updated successfully", user: updatedUser });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while updating user" });
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id || req.query.id;

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id: Number(userId) } });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await userRepository.delete(user.id);

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while deleting user" });
	}
};

const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { email } });

		if (!user) {
			// For security, don't reveal if user exists
			return res.status(200).json({ message: "If an account with that email exists, a reset link has been sent." });
		}

		// Invalidate previous session tokens for this user
		const userTokenRepository = AppDataSource.getRepository(UserToken);
		await userTokenRepository.delete({ user: { id: user.id } });

		const userEmailTokenRepository = AppDataSource.getRepository(UserEmailToken);
		// Always delete previous reset tokens for this user
		await userEmailTokenRepository.delete({ user: { id: user.id } });

		// Generate a new token (JWT) with a 5 minute expiration
		const token = jwtSign({ userId: user.id, email: user.email }, process.env.JWT_RESET_PASSWORD_TIME || "5m");

		// Save the token in the user_email_token table
		await userEmailTokenRepository.save({
			user: user,
			token: token,
		});

		const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${token}`;

		// Send the reset password email
		await sendResetPasswordEmail(user.email, user.firstName, resetLink);

		return res.status(200).json({ message: "If an account with that email exists, a reset link has been sent." });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while processing forgot password request" });
	}
};

const resetPassword = async (req: Request, res: Response) => {
	try {
		const { token, newPassword } = req.body;
		if (!token || !newPassword) {
			return res.status(400).json({ message: "Token and new password are required" });
		}

		const userEmailTokenRepository = AppDataSource.getRepository(UserEmailToken);
		const tokenEntry = await userEmailTokenRepository.findOne({ where: { token }, relations: ["user"] });

		if (!tokenEntry) {
			return res.status(400).json({ message: "Invalid or expired token" });
		}

		// Optionally: verify JWT expiration if using JWT
		try {
			jwtVerify(token);
		} catch {
			return res.status(400).json({ message: "Token expired" });
		}

		const userRepository = AppDataSource.getRepository(User);
		const user = tokenEntry.user;
		user.password = hashPassword(newPassword);
		await userRepository.save(user);

		// Invalidate the token
		await userEmailTokenRepository.delete({ id: tokenEntry.id });

		return res.status(200).json({ message: "Password has been reset successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error occurred while resetting password" });
	}
};

export { registerUser, loginUser, logoutUser, getUser, updateUser, deleteUser, forgotPassword, resetPassword };

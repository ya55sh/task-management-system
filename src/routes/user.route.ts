import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
	userLoginValidationMiddleware,
	userRegisterValidationMiddleware,
} from "../middlewares/user_validation.middlware";
import {
	getUser,
	registerUser,
	loginUser,
	logoutUser,
	updateUser,
	deleteUser,
	forgotPassword,
	resetPassword,
	getUsers,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/:id", authMiddleware, getUser);
userRouter.get("/", authMiddleware, getUsers);
userRouter.post("/register", userRegisterValidationMiddleware, registerUser);
userRouter.post("/login", userLoginValidationMiddleware, loginUser);
userRouter.post("/logout", authMiddleware, logoutUser);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.delete("/:id", authMiddleware, deleteUser);

userRouter.post("/forgot-password", authMiddleware, forgotPassword);
userRouter.post("/reset-password", authMiddleware, resetPassword);

export { userRouter };

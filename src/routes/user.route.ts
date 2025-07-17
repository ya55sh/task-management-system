import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", (getUser) => {});
userRouter.post("/register", (registerUser) => {});
userRouter.post("/login", (loginUser) => {});
userRouter.post("/logout", (logoutUser) => {});
userRouter.put("/:id", (updateUser) => {});
userRouter.delete("/:id", (deleteUser) => {});

userRouter.post("/forgot-password", (forgotPassword) => {});
userRouter.post("/reset-password", (resetPassword) => {});
userRouter.post("/verify-email", (verifyEmail) => {});
userRouter.post("/resend-verification-email", (resendVerificationEmail) => {});
userRouter.post("/send-verification-email", (sendVerificationEmail) => {});
userRouter.post("/send-reset-password-email", (sendResetPasswordEmail) => {});

export { userRouter };

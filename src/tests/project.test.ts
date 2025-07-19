import express, { response } from "express";
import request from "supertest";
import { indexRouter } from "../routes/index.route";
import { AppDataSource } from "../db/model";
import { User, UserRole } from "../db/entity/user";
import { UserToken } from "../db/entity/user_token";

const app = express();
app.use(express.json());
app.use("/v1", indexRouter);

beforeAll(async () => {
	await AppDataSource.initialize();
});

afterAll(async () => {
	await AppDataSource.destroy();
});

describe("Project", () => {
	it("should create a project", async () => {
		try {
			// Clean up database before test
			const userTokenRepository = AppDataSource.getRepository(UserToken);
			const userRepository = AppDataSource.getRepository(User);

			// Delete existing user tokens and users
			await userTokenRepository.clear();
			await userRepository.delete({ email: "testuser@example.com" });

			// 1. Create user (register)
			const userPayload = {
				firstName: "yash",
				lastName: "bahuguna",
				email: "testuser@example.com",
				password: "TestPassword123!",
			};

			console.log("Step 1: Creating user...");
			const createUser = await request(app).post("/v1/user/register").send(userPayload);
			console.log("User created:", createUser.body);
			console.log("User status:", createUser.status);

			// 2. Login to get token
			console.log("Step 2: Logging in...");
			const loginResponse = await request(app)
				.post("/v1/user/login")
				.send({ email: userPayload.email, password: userPayload.password });

			console.log("Login response:", loginResponse.body);
			console.log("Login status:", loginResponse.status);
			const token = loginResponse.body.token;

			// 3. Create project with token
			console.log("Step 3: Creating project...");
			const projectPayload = {
				title: "Test Project",
			};

			// Update the user role to admin using the update user API
			console.log("Step 3.5: Updating user to admin...");
			const updateUserPayload = {
				role: UserRole.ADMIN,
			};

			// Get user ID from the created user
			const user = await userRepository.findOne({ where: { email: userPayload.email } });
			console.log("Found user:", user);

			if (!user) {
				throw new Error("User not found after creation");
			}

			const updateUserResponse = await request(app)
				.put(`/v1/user/${user.id}`) // Use user ID in URL
				.set("Authorization", `Bearer ${token}`)
				.send(updateUserPayload);

			console.log("Update user to admin response:", updateUserResponse.body);
			console.log("Update user status:", updateUserResponse.status);

			const response = await request(app)
				.post("/v1/project/create")
				.set("Authorization", `Bearer ${token}`)
				.send(projectPayload);

			console.log("Project creation response:", response.body);
			console.log("Project creation status:", response.status);

			// Note: This test will fail because only admins can create projects
			// The project controller checks for admin role
			expect(response.status).toBe(201); // Changed to expect success
			expect(response.body.message).toBe("Project created successfully");
		} catch (error) {
			console.error("Test failed with error:", error);
			throw error;
		}
	});
});

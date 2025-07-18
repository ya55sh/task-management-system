import express from "express";
import request from "supertest";
import { indexRouter } from "../routes/index.route";

import { AppDataSource } from "../db/model";

beforeAll(async () => {
	await AppDataSource.initialize();
});

afterAll(async () => {
	await AppDataSource.destroy();
});

const app = express();
app.use(express.json());
app.use("/v1", indexRouter);

// describe("POST /register", () => {
// 	it("should register a new user", async () => {
// 		const userPayload = {
// 			firstName: "yash",
// 			lastName: "bahuguna",
// 			email: "testuser@example.com",
// 			password: "TestPassword123!",
// 		};

// 		const res = await request(app).post("/v1/user/register").send(userPayload).set("Accept", "application/json");

// 		console.log(res.body);

// //expect(res.body).toHaveProperty("error");
// //expect(res.body.error).toBe("Invalid request body");
// //expect(res.status).toBe(400);

// //expect(res.body).toHaveProperty("message");
// expect(res.status).toBe(201);
// expect(res.body.user).toHaveProperty("id");
// expect(res.body.user).toHaveProperty("firstName", userPayload.firstName);
// expect(res.body.user).toHaveProperty("lastName", userPayload.lastName);
// expect(res.body.user).toHaveProperty("email", userPayload.email);
// expect(res.body.user).not.toHaveProperty("password");
// 	});
// });

// login user test --- alter the test case scenario to test the login with invalid email and password
// describe("POST /login", () => {
// 	it("should login a user", async () => {
// 		const userPayload = {
// 			email: "testuser@example.com",
// 			password: "TestPassword123!",
// 		};

// 		const res = await request(app).post("/v1/user/login").send(userPayload).set("Accept", "application/json");

// 		console.log(res.body);

// 		// expect(res.status).toBe("400");
// 		// expect(res.body).toHaveProperty("error");

// 		expect(res.status).toBe(200);
// 		expect(res.body).toHaveProperty("token");
// 	});
// });

// logout user test
describe("POST /logout", () => {
	it("should logout a user", async () => {
		let token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo4LCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiZmlyc3ROYW1lIjoieWFzaCIsImxhc3ROYW1lIjoiYmFodWd1bmEiLCJpYXQiOjE3NTI4NzEyMDMsImV4cCI6MTc1Mjg3NDgwM30.GNJdVcfK2bewFqyjTkaxbQbeeH0DDk7dRv1OAeO1uqk";
		const res = await request(app)
			.post("/v1/user/logout")
			.set("Authorization", `Bearer ${token}`)
			.set("Accept", "application/json");
		console.log(res.body);

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("message");
	});
});

import express from "express";
import request from "supertest";

const app = express();

app.get("/v1/user", (req, res) => {
	res.status(200).json({ id: 1, name: "John Doe" });
});

describe("GET /v1/user", () => {
	it("should return user data", async () => {
		const response = await request(app).get("/v1/user");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ id: 1, name: "John Doe" });
	});
});

app.get("/v1/user/signup", (req, res) => {
	res.status(201).json({ message: "User signed up successfully" });
});

describe("GET /v1/user/signup", () => {
	it("should return signup success message", async () => {
		const response = await request(app).get("/v1/user/signup");
		expect(response.status).toBe(201);
		expect(response.body).toEqual({ message: "User signed up successfully" });
	});
});

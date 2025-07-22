import request from "supertest";
import express from "express";
import { indexRouter } from "../routes/index.route";
import { AppDataSource } from "../db/model";
import { User } from "../db/entity/user";
import { UserToken } from "../db/entity/user_token";

beforeAll(async () => {
	await AppDataSource.initialize();
});

afterAll(async () => {
	await AppDataSource.destroy();
});

const app = express();
app.use(express.json());
app.use("/v1", indexRouter);

//let token =
//	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxNSwiZW1haWwiOiJ0ZXN0dXNlckBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6Inlhc2giLCJsYXN0TmFtZSI6ImJhaHVndW5hIiwiaWF0IjoxNzUzMTI5MjIyLCJleHAiOjE3NTMxMzI4MjJ9.HWIUeZksisdFH5u-SC_F8rKsyBgAGGmS5Yy5zc8Cal0";
//title, description, dueDate, status, projectId, assignedToId
describe("POST /task/create", () => {
	let token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxOCwiZW1haWwiOiJ0ZXN0dXNlckBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6Inlhc2giLCJsYXN0TmFtZSI6ImJhaHVndW5hIiwiaWF0IjoxNzUzMTYyODc3LCJleHAiOjE3NTMxNjY0Nzd9.rv67A92retvPG6M2gfRhnOAORw4ZQwBlfF2m_eymkNg";
	it("should create a task", async () => {
		const res = await request(app).post("/v1/task/").set("Authorization", `Bearer ${token}`).send({
			title: "Test Task",
			description: "Test Description",
			projectId: 8,
			dueDate: "2025-07-22",
			status: "started",
			assignedToId: "18", // Use the created user's id
		});
		console.log(res.body);
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("message");
		expect(res.body).toHaveProperty("task");
	});
});

// describe("GET /task", () => {
// 	it("should get all tasks", async () => {
// 		const res = await request(app).get("/v1/task").set("Authorization", `Bearer ${token}`);
// 		console.log(res.body);
// 		expect(res.status).toBe(200);
// 		expect(res.body).toHaveProperty("tasks");
// 	});
// });

import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db/model";
import cors from "cors";
import { indexRouter } from "./routes/index.route";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", indexRouter);

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

async function startServer() {
	try {
		await AppDataSource.initialize();
		console.log("Data Source has been initialized!");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error during Data Source initialization:", error);
		process.exit(1); // Exit the process if DB fails to initialize
	}
}

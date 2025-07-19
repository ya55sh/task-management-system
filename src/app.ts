import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db/model";
import cors from "cors";
import { indexRouter } from "./routes/index.route";
import { createServer } from "http";
import { setupSocketServer } from "./clients/socket";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

setupSocketServer(httpServer);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", indexRouter);

async function startServer() {
	try {
		await AppDataSource.initialize();
		console.log("Data Source has been initialized!");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error during Data Source initialization:", error);
		process.exit(1); // Exit the process if DB fails to initialize
	}
}
startServer();

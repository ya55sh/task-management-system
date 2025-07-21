import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/model";
import { indexRouter } from "./routes/index.route";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerSocket } from "./clients/socket";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", indexRouter);

const io = new Server(httpServer, {
	// options
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["Authorization", "Content-Type"],
		credentials: true,
	},
});

registerSocket(io);

async function startServer() {
	try {
		await AppDataSource.initialize();
		console.log("Data Source has been initialized!");
		httpServer.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error during Data Source initialization:", error);
		process.exit(1); // Exit the process if DB fails to initialize
	}
}
startServer();

import { Server } from "socket.io";
import { Server as HttpServer } from "http";

const setupSocketServer = (httpServer: HttpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log("A user connected");
	});
};

export { setupSocketServer };

// Socket functionality removed

import { jwtVerify } from "../utils/token.util";
import { AppDataSource } from "../db/model";
import { User } from "../db/entity/user";
import { Server } from "socket.io";
import { Socket } from "socket.io";
import { setIO } from "../utils/socket_emitter";

export const userSocketMap = new Map<number, Socket>();

export const registerSocket = (io: Server) => {
	setIO(io);

	io.on("connection", async (socket: Socket) => {
		// get the token from the handshake
		// verify the token
		// get the user from the token
		// set the user in the socket
		// join the user to the room
		// disconnect the socket if the user is not found
		// disconnect the socket if the token is not valid
		// disconnect the socket if the user is not found
		let userToken = socket.handshake.auth.token;
		if (!userToken) {
			socket.disconnect();
			return;
		}
		let decoded = jwtVerify(userToken);
		if (typeof decoded === "string" || !decoded.user) {
			socket.disconnect();
			return;
		}
		let user = await AppDataSource.getRepository(User).findOne({ where: { id: decoded.user } });
		if (!user) {
			socket.disconnect();
			return;
		}

		socket.data.user = user;
		userSocketMap.set(user.id, socket);

		socket.join(user.id.toString()); //maybe redundant we'll see for later updates

		socket.on("disconnect", () => {
			userSocketMap.delete(user.id);
		});
	});
};

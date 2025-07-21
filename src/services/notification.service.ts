// Notification service functionality removed
import { userSocketMap } from "../clients/socket";

const assignTaskNotification = (from: number, to: number, taskId: number) => {
	//check if the user is online and send the notification
	const socket = userSocketMap.get(to);
	if (socket) {
		socket.emit("task_assigned", { from, to, taskId });
	}
};

const updateTaskNotification = (to: number, taskId: number) => {
	//check if the user is online and send the notification
	const socket = userSocketMap.get(to);
	if (socket) {
		socket.emit("task_updated", { to, taskId });
	}
};

export { assignTaskNotification, updateTaskNotification };

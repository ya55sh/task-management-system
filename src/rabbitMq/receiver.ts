import amqp from "amqplib";
import { sendEmailFromQueue } from "../services/mail.service";

const receiveMessage = async (queue: string) => {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		await channel.assertQueue(queue);
		await channel.consume(
			queue,
			(msg) => {
				if (msg !== null) {
					console.log(` [x] Received ${msg.content.toString()}`);
					const message = JSON.parse(msg.content.toString());
					if (queue === "task:assigned" || queue === "task:updated") {
						sendEmailFromQueue(message);
					}
					channel.ack(msg);
				}
			},
			{ noAck: false }
		);
		console.log(" [*] Waiting for messages. To exit press CTRL+C");
	} catch (error) {
		console.error(`Error while receiving rabbitmq message ${error}`);
	}
};

export { receiveMessage };

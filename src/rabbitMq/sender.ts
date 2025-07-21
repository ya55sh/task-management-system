import amqp from "amqplib";

const sendMessage = async (queue: string, message: string) => {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		await channel.assertQueue(queue);
		await channel.sendToQueue(queue, Buffer.from(message));
		console.log(` [x] Sent ${message}`);
	} catch (error) {
		console.error(`Error while sending rabbitmq message ${error}`);
	}
};

export { sendMessage };

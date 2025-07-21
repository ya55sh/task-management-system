import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "zoie40@ethereal.email",
		pass: "TKH7gT1urGymtZqhDm",
	},
});

const sendEmail = async (email: string, subject: string, html: string) => {
	const mailOptions = {
		from: process.env.SMTP_FROM || "zoie40@ethereal.email",
		to: email,
		subject: subject,
		html: html,
	};
	await transporter.sendMail(mailOptions);
};

async function sendResetPasswordEmail(email: string, firstName: string, resetLink: string) {
	const subject = "Password Reset Request";
	const html = `<p>Hi ${firstName},</p>
           <p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>If you did not request this, you can ignore this email.</p>`;
	await sendEmail(email, subject, html);
}

const sendEmailFromQueue = async (message: any) => {
	await sendEmail(message.email, message.subject, message.body);
};

export { transporter, sendEmail, sendResetPasswordEmail, sendEmailFromQueue };

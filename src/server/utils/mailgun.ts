import FormData from "form-data";
import Mailgun from "mailgun.js";
import { Env } from "./env";

const mailgun = new Mailgun(FormData);

const getMailgunClient = () => {
	if (!Env.MAILGUN_API_KEY || !Env.MAILGUN_DOMAIN) {
		console.warn("Mailgun not configured. Emails will be logged to console.");
		return null;
	}

	return mailgun.client({
		username: "api",
		key: Env.MAILGUN_API_KEY,
	});
};

export async function sendPasswordResetEmail(
	email: string,
	token: string,
): Promise<void> {
	const resetUrl = `${Env.APP_URL}/reset-password?token=${token}`;

	const client = getMailgunClient();

	if (!client || !Env.MAILGUN_DOMAIN) {
		// Development mode - log to console
		console.log("\n=== PASSWORD RESET EMAIL ===");
		console.log(`To: ${email}`);
		console.log(`Reset URL: ${resetUrl}`);
		console.log("===========================\n");
		return;
	}

	try {
		await client.messages.create(Env.MAILGUN_DOMAIN, {
			from: `Find My Mixi <noreply@${Env.MAILGUN_DOMAIN}>`,
			to: [email],
			subject: "Reset Your Password",
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2>Reset Your Password</h2>
					<p>You requested to reset your password. Click the button below to set a new password:</p>
					<div style="margin: 30px 0;">
						<a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
							Reset Password
						</a>
					</div>
					<p>Or copy and paste this link into your browser:</p>
					<p style="color: #666; word-break: break-all;">${resetUrl}</p>
					<p style="color: #999; font-size: 14px; margin-top: 30px;">
						This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
					</p>
				</div>
			`,
			text: `Reset Your Password\n\nYou requested to reset your password. Click the link below to set a new password:\n\n${resetUrl}\n\nThis link will expire in 1 hour. If you didn't request this, you can safely ignore this email.`,
		});
	} catch (error) {
		console.error("Failed to send password reset email:", error);
		throw new Error("Failed to send email");
	}
}

// * IMPORTS
const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailer-config");

// * FUNCTIONS
// Send verification email
const sendVerificationEmail = async ({
	email,
	verificationToken,
	frontendUrl,
}) => {
	await nodemailer.createTestAccount(); // Create a test account
	const transporter = await nodemailer.createTransport(nodemailerConfig); // Create a transporter
	const verifyLink = `${frontendUrl}/verify?token=${verificationToken}&email=${email}`; // Create the verification link

	// Create the message
	const message = `<h2>Welcome to Template</h2><p>Thanks for creating an account. click <a href="${verifyLink}" target="_blank">here</a> to verify your email</p>`;

	// Send the email
	return transporter.sendMail({
		from: "sender@example.com", //TODO: Update this
		to: email,
		subject: "Email Confirmation",
		html: message,
	});
};

// Send reset password email
const sendResetPasswordEmail = async ({
	email,
	passwordToken,
	frontendUrl,
}) => {
	const resetLink = `${frontendUrl}api/v1/auth/reset-password?token=${passwordToken}&email=${email}`; // Create the reset link

	// Create the message
	const message = `<h2>Reset Password</h2><p>Please click on the following link to reset your password.</p><br /><p><a href="${resetLink}" target="_blank">Reset Password</a> to verify your email</p>`;

	// Send the email
	return sendEmail({ to: email, subject: "Password Reset", html: message });
};

// * EXPORTS
module.exports = { sendVerificationEmail, sendResetPasswordEmail };

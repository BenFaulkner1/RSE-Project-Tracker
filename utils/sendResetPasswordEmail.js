import sendEmail from "./sendEmail.js";

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please Reset Password by clicking on the following link : <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${name}</h4>
    ${message}
    `,
  });
};

export default sendResetPasswordEmail;
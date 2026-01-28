import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    // Create a transporter object using the SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    const resetEmailTemplate = (resetURL) => {
      return `
    <div style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border-collapse: collapse; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <tr>
                <td style="padding: 40px 30px; text-align: center;">
                    
                    <div style="margin-bottom: 25px;">
                        <img src="https://superlightingbd.com/assets/logo.png" 
                             alt="Super Lighting BD" 
                             width="120" 
                             height="120" 
                             style="display: block; margin: 0 auto; border-radius: 50%; border: 4px solid #9e9eec; object-fit: contain;">
                    </div>

                    <h2 style="color: #333333; font-size: 24px; font-weight: 700; margin: 0 0 15px 0;">
                        Reset Your Password
                    </h2>

                    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        We received a request to reset the password for your <strong>Super Lighting BD</strong> account. 
                        Click the button below to choose a new one.
                    </p>

                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                            <td align="center" bgcolor="#007bff" style="border-radius: 5px;">
                                <a href="${resetURL}" target="_blank" style="display: inline-block; padding: 14px 30px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 5px;">
                                    Reset Password
                                </a>
                            </td>
                        </tr>
                    </table>

                    <p style="color: #999999; font-size: 13px; margin-top: 30px;">
                        If you did not request a password reset, you can safely ignore this email. This link will expire shortly for your security.
                    </p>

                    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 40px 0 20px 0;">

                    <div style="text-align: center;">
                        <p style="color: #333333; font-size: 15px; font-weight: 600; margin: 0;">Regards,</p>
                        <p style="color: #555555; font-size: 14px; margin: 5px 0 0 0;">The Super Lighting BD Team</p>
                    </div>

                </td>
            </tr>
        </table>

        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
            <tr>
                <td style="padding: 20px; text-align: center; color: #aaaaaa; font-size: 12px;">
                    © ${new Date().getFullYear()} Super Lighting BD. All rights reserved.
                </td>
            </tr>
        </table>
    </div>`;
    };

    const sendEmail = await transporter.sendMail({
      from: process.env.NODEMAILER_USER_EMAIL, // Use your email from .env
      to: email,
      subject: "Super Lighting BD - Reset Password",
      html: resetEmailTemplate(resetURL),
    });
    return sendEmail;
  } catch (error) {
    throw error;
  }
};

export default sendResetPasswordEmail;

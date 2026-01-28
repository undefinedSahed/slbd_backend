const emailTemplate = (token, frontendURL) => {
  const verificationLink = `${frontendURL}/signup/verify-email?token=${token}`;

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

                    <h2 style="color: #333333; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
                        Verify Your Email Address
                    </h2>

                    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        Welcome to <strong>Super Lighting BD</strong>! We're excited to have you on board. 
                        To get started, please confirm your email address by clicking the button below:
                    </p>

                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                            <td align="center" bgcolor="#007bff" style="border-radius: 5px;">
                                <a href="${verificationLink}" target="_blank" style="display: inline-block; padding: 14px 30px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 5px;">
                                    Verify Email
                                </a>
                            </td>
                        </tr>
                    </table>

                    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 40px 0 20px 0;">

                    <p style="color: #999999; font-size: 13px; margin-bottom: 25px;">
                        If you did not create an account with Super Lighting BD, you can safely ignore this email.
                    </p>

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

export default emailTemplate;

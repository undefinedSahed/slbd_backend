const emailTemplate = (token) => {
    return `
    <div style="font-family: 'Poppins', sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; background: #fff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Logo -->
            <img src="https://i.ibb.co.com/GQYT0Jt0/slbd.jpg" alt="SLBD Logo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #9e9eec; margin-bottom: 20px;">
            
            <!-- Title -->
            <h2 style="color: #333; font-weight: 700; font-size: 24px; margin-bottom: 10px;">Verify Your Email Address</h2>

            <!-- Message -->
            <p style="color: #555; font-size: 16px; line-height: 1.5;">
                Welcome to <strong>Super Lighting BD</strong>, the best lighting solutions provider! <br>
                Please verify your email address by clicking the button below:
            </p>

            <!-- Verification Button -->
            <a href="https://superlightingbd.com/register/verify-email?token=${token}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 30px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 5px; margin-top: 20px;">
                Verify Email
            </a>

            <!-- Footer -->
            <p style="color: #777; font-size: 14px; margin-top: 30px;">If you did not request this email, please ignore it.</p>

            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
                <h5 style="color: #333; font-size: 16px; margin-bottom: 5px;">Regards,</h5>
                <p style="color: #555; font-size: 14px;">Md. Ashikur Rahman</p>
                <p style="color: #888; font-size: 14px;">Super Lighting BD</p>
            </div>
        </div>
    </div>`;
};

export default emailTemplate;
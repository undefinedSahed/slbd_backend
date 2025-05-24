const resetPasswordTemplate = (resetURL) => {
    return `
    <div style="font-family: 'Poppins', sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; background: #fff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Logo -->
            <img src="https://res.cloudinary.com/sahed/image/upload/v1747864959/logo_ywp8d9.png" alt="SLBD Logo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #9e9eec; margin-bottom: 20px;">
            
            <!-- Title -->
            <h2 style="color: #333; font-weight: 700; font-size: 24px; margin-bottom: 10px;">Reset Your Password</h2>

            <!-- Verification Button -->
            <a href="${resetURL}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 30px; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 5px; margin-top: 20px;">
                Reset Password
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

export default resetPasswordTemplate;
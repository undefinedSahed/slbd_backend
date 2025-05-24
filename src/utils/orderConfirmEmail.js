import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const sendOrderConfirmationEmail = async (email, orderDetails) => {
    try {
        // Create a transporter object using the SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER_EMAIL,
                pass: process.env.NODEMAILER_APP_PASSWORD
            }
        });

        const orderConfirmationTemplate = (orderDetails) => {
            return `
                <div style="font-family: 'Poppins', sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; background: #fff; margin: 0 auto; padding: 30px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);">

                        <img src="https://res.cloudinary.com/sahed/image/upload/v1747864959/logo_ywp8d9.png" alt="SLBD Logo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #9e9eec; margin-bottom: 20px;">

                        <h2 style="color: #333; font-weight: 700; font-size: 24px; margin-bottom: 20px;">Order Confirmation</h2>

                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            Dear Customer,<br><br>
                            Thank you for your order with <strong>Super Lighting BD</strong>! Your order has been placed successfully. Please find the summary below:
                        </p>

                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; text-align: left;">
                            <h4 style="color: #333; font-size: 18px; margin-bottom: 10px;">Order Summary:</h4>
                            <p style="color: #333; font-size: 16px; font-weight: 600;">Total Amount: ৳ ${orderDetails.totalAmount.toFixed(2)}</p>
                            <p style="color: #333; font-size: 16px; font-weight: 600;">Delivery Charge: ৳ ${orderDetails.deliveryCharge.toFixed(2)}</p>
                            <p style="color: #28a745; font-size: 18px; font-weight: 800;">Total Payable Amount: ৳ ${orderDetails.totalPayable.toFixed(2)}</p>
                        </div>

                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            Please pay <strong>৳ ${orderDetails.totalPayable.toFixed(2)}</strong> to the delivery person upon receiving your order. We will contact you soon regarding the delivery schedule.
                        </p>

                        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-top: 30px;">
                            Thank you for being with us!
                        </p>

                        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
                            <h5 style="color: #333; font-size: 16px; margin-bottom: 5px;">Regards,</h5>
                            <p style="color: #555; font-size: 14px;">Super Lighting BD Team</p>
                        </div>
                    </div>
                </div>
            `;
        };

        const sendEmail = await transporter.sendMail({
            from: process.env.NODEMAILER_USER_EMAIL, // Use your email from .env
            to: email,
            subject: "Super Lighting BD - Order Confirmation",
            html: orderConfirmationTemplate(orderDetails)
        });

        return sendEmail;

    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
};

export default sendOrderConfirmationEmail;
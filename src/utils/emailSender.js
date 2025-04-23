import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config(
    {
        path: "./.env"
    }
);


const emailSender = async (email, emailTemplate) => {
    // Create a transporter object using the SMTP transporter
    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER_EMAIL,
                pass: process.env.NODEMAILER_APP_PASSWORD
            }
        }
    );


    const sendEmail = await transporter.sendMail(
        {
            from: "superlightingbd@gmail.com",
            to: email,
            subject: "Super Lighting BD - Verification Email",
            html: emailTemplate
        }
    )
}


export default emailSender;
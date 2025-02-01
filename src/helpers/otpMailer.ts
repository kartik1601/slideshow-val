import nodemailer from 'nodemailer';

export const sendOtpEmail = async ({ email, otp } : any) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });

        const mailOptions = {
            from: 'kartiku904@gmail.com',
            to: email,
            subject: "OTP Verification",
            html: `<p><h1>Use the following OTP:</h1> </hr> <h2>${otp}</h2>
            </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
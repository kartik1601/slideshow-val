import nodemailer from 'nodemailer';

export const sendOtpEmail = async ({ email, otp, username } : any) => {
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
            html: `<p><h1>Hi, ${username}</h1> <h2>Use the following OTP for verification:</h2> </hr> <h3>${otp}</h3>
            </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
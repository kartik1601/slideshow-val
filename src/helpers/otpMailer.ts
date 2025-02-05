import nodemailer from 'nodemailer';

export const sendOtpEmail = async ({ email, otp, username } : any) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            }
        });

        const mailOptions = {
            from: '"SLD-VAL" <kartiku904@gmail.com>',
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
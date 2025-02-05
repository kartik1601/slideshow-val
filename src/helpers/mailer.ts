import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import crypto from 'crypto';

export const sendEmail = async ({ email, emailType, userId } : any) => {
    try {
        const token = await crypto.randomBytes(48).toString('hex');

        console.log(token);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                        verifyToken: token, verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            );
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                        forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            );
        }
        
        // const transporter = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: process.env.MAILTRAP_USER,
        //         pass: process.env.MAILTRAP_PASS,
        //     }
        // });
                
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.resend.com",
        //     secure: true,
        //     port: 465,
        //     auth: {
        //         user: 'resend',
        //         pass: process.env.RESEND_API,
        //     }
        // });
        
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
            subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${token}
            </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import brcyptjs from 'bcryptjs';
import { sendOtpEmail } from "@/helpers/otpMailer";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password, otp } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not Registered!"
            });
        }
        
        const isValid = await brcyptjs.compare(password, user.password);
        
        if (!isValid) {
            return NextResponse.json({
                success: false,
                message: "Wrong Email or Password!"
            });
        }

        if (!user.isAdmin) {
            return NextResponse.json(
                {
                    message: "User not authorised to access this resource. Contact Admin.",
                    success: false,
                }, 
                {status: 403},
            );
        }

        const username = user.username;

        await sendOtpEmail({ email, otp, username });

        return NextResponse.json(
            {
                success: true,
                message: "Verification mail sent successfully!"
            },
            { status: 200 }
        );

    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500},
        );
    }
}
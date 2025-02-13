import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    message: "User does not exists",
                    success: false,
                }, 
                {status: 400},
            );
        }

        const validation = await bcryptjs.compare(password, user.password);

        if (!validation) {
            return NextResponse.json(
                {
                    message: "Invalid password",
                    success: false,
                }, 
                {status: 400},
            );
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

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "7d"});

        const response = NextResponse.json(
            {
                message: "Login Successful!",
                success: true,
                tokenData: token,
            },
        );

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500},
        );
    }
}
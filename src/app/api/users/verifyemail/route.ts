import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()} });

        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid token or Token expired!",
                    success: false,
                }, 
                {status: 400},
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                {
                    message: "User Already Verified",
                    success: false,
                },
            );
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                message: "User Verified successfully",
                success: true,
            },
        );

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
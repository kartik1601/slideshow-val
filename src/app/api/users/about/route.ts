import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenData } from '@/helpers/getTokenData';

connect();

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const userId = await getTokenData(req);
        if (userId === "") {
            return NextResponse.json(
                {
                    message: "Please login.",
                    success: false,
                }, 
                {status: 500},
            );
        }
        const user = await User.findOne({ _id: userId }).select("-password");
    
        if (!user) {
            return NextResponse.json(
                {
                    message: "User does not exists!",
                    success: false,
                }, 
                {status: 400},
            );
        }
    
        return NextResponse.json(
            {
                message: "User Found",
                success: true,
                data: user,
            }, 
        );
        
    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
            }, {status: 500}
        );
    }
}
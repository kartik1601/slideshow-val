import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

connect();

export const maxDuration = 60;

export async function GET() {
    try {
        const res = NextResponse.json(
            {
                message: "Logout Successfully!",
                success: true,
            },
        );

        res.cookies.set("token","", {
            httpOnly: true,
            expires: new Date(0)
        });

        return res;
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500},
        );
    }
}
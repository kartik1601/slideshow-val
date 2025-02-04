import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Memory from '@/models/memoryModel';
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();

        const { message, date, userId }:any = reqBody;

        // const userExists = await User.findById({ _id: userId });

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User does not exist. Please login!"
            }, {status: 400});
        }

        if (!message || !date) {
            return NextResponse.json({
                success: false,
                message: "All fields are required."
            }, {status: 400});
        }

        const user = await User.findById({ _id: userId });

        const updatedMemory = await Memory.findOneAndUpdate(
            { date }, {
                $push: { data: message },
                $set: { updatedById: user.username },
                $setOnInsert: { 
                    date,
                    createdById: user.username,
                },
            }, {
                upsert: true,
                new: true,
                runValidators: true,
            },
        );

        return NextResponse.json({
            success: true,
            message: "Memory created successfully.",
            data: updatedMemory,
        }, { status: 200 });

    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
            }, {status: 500}
        );
    }
}
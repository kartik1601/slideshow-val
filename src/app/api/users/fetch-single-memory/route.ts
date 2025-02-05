import { NextRequest, NextResponse } from "next/server";
import Memory from "@/models/memoryModel";

/* 
    request format => 
    {
        date: Date,
    }

    Will fetch all the memories belonging to {date-month-year}
*/
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();

        const { date } = reqBody;

        // console.log(date);

        if (!date) {
            return NextResponse.json({
                success: false,
                message: "Please provide the date",
            }, {status: 400});
        }

        const memory = await Memory.findOne({ date });

        if (!memory) {
            return NextResponse.json({
                success: false,
                message: "Memory does not exist for this day."
            }, {status: 400});
        }

        return NextResponse.json({
            success: true,
            message: "Memory fetched successfully!",
            memory,
        }, {status: 200});


    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
            }, {status: 500}
        );
    }
}
import { getTokenData } from "@/helpers/getTokenData";
import Memory from "@/models/memoryModel";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const isAuth = getTokenData(req);

        if (!isAuth) {
            return NextResponse.json({
                success: false,
                message: "Please authenticate to review."
            }, {status: 400});
        }

        const res = await Memory.find();

        return NextResponse.json({
            success: true,
            message: "Fetched all data successfully!",
            res,
        }, {status: 200});

    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
            }, {status: 500}
        );
    }
}
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        // Always use await with req.json

        const { folderName }:any = reqBody;

        if (!folderName) {
            return NextResponse.json({
                success:false,
                message: "Folder name required!",
                data: folderName,
            }, {status: 403});
        }

        const res = await cloudinary.search.expression(folderName).execute();

        return NextResponse.json({
            success: true,
            images: res.resources,
        }, {status: 200});

    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
            }, {status: 500},
        );
    }
}
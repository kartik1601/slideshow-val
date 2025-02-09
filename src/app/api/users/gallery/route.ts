import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

export const maxDuration = 60;

export async function fetchAllImages(folderName: string, nextCursor: string | null = null, images: any[] = []) {
  try {
    const query = `folder=${folderName}`;
    
    // Make API call with pagination support
    const res = await cloudinary.search
      .expression(query)
      .max_results(100)
      .next_cursor(nextCursor || undefined)
      .execute();

    images.push(...res.resources); 

    if (res.next_cursor) {
      return await fetchAllImages(folderName, res.next_cursor, images);
    }

    return images;
  } catch (error:any) {
    throw new Error(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { folderName }: any = reqBody;

    if (!folderName) {
      return NextResponse.json(
        { success: false, message: "Folder name required!", data: folderName },
        { status: 403 }
      );
    }

    const allImages = await fetchAllImages(folderName);

    return NextResponse.json({ success: true, images: allImages }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

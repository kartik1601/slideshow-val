import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getTokenData = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";

        console.log(token);

        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken.id;
    } catch (error:any) {
        throw new Error(`Please login to access + ${error.message}`);
    }
}
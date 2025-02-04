import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublicPath = (path === '/' || path === '/login' || path === '/signup' || path === '/verifyemail' );

    const token = req.cookies.get("token")?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', req.url));
    } 
    
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

}

export const config = {
    matcher: [
        '/',
        '/home',
        '/login',
        '/signup',
        '/verifyemail',
        '/gallery',
        '/calendar',
        '/addmemories'
    ],
}
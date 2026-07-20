import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value;
}

export async function setAccessToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60,
    });
}

export async function deleteAccessToken() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
}

// 토큰 검사 미들웨어
export async function checkAccessToken(req: NextRequest) {
    const token = await getAccessToken();

    if (token && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (token && req.nextUrl.pathname === '/register') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && req.nextUrl.pathname.startsWith('/mypage')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
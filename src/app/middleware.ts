import { JwtPayload, decode } from 'jsonwebtoken';
import moment from 'moment';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const decodeToken = decode(token?.accessToken as string) as JwtPayload
    const expire = decodeToken ? decodeToken.exp as number : 0;

    const now = moment().unix()
    const isTokenExpire = now < expire

    if (isTokenExpire) {
        return NextResponse.next();
    } else {
        const response = NextResponse.redirect(new URL('/', req.url))
        const sesCookies = req.cookies.get('next-auth.session-token')?.value
        if (sesCookies) {
            response.cookies.delete('next-auth.session-token')
        }
        return response
    }
}

export const config = {
    matcher: [
        '/post'
    ]
}
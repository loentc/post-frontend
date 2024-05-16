// next-auth.d.ts
import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        expires: string
        user: {
            accessToken: string;
            expires: string
            email: string;
            iat: number;
            exp: number;
        };
    }
}

// next-auth-jwt.d.ts
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        expires: string
        accessToken: string;
        email: string;
        iat: number;
        exp: number;

    }
}

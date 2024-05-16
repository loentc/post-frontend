import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials'
import getConfig from 'next/config';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }

            },
            async authorize(credentials) {
                try {

                    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();


                    const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;
                    const backendUrl = apiUrl + 'auth/login'
                    const response = await axios.post(backendUrl, credentials);

                    const data = response.data;

                    if (response.status === 201 && data) {
                        return data
                    }
                    return null;
                } catch (error) {
                    console.error('Error authorization:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user } as JWT
            return token
        },
        async session({ token, session }) {
            session.user = token
            return session
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
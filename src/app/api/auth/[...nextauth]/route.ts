import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }

            },
            async authorize(credentials) {
                try {
                    const backendUrl = process.env.BACKEND_URL + 'auth/login'
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
            if (user) return { ...token, ...user }
            return token
        },
        async session({ token, session }) {
            session.user = token
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
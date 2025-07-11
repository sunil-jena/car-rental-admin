/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

interface AdminCredentials {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) throw new Error("No credentials provided");

                const { email, password } = credentials as AdminCredentials;

                const admin = await prisma.adminUser.findUnique({
                    where: { email },
                });

                if (!admin || password !== admin.password) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/' },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);

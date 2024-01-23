import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          email: "user@email.com",
          password: "123",
          name: "User Hardcoded",
          role: "admin",
        };
        const isValidEmail = user.email === credentials?.email;
        const isValidPassword = user.password === credentials?.password;
        if (!isValidEmail || !isValidPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      const customUser = user as unknown as any;

      if (user) {
        return {
          ...token,
          role: customUser.role,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

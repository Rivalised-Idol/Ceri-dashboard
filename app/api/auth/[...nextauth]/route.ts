

import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "WordPress",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(process.env.WP_JWT_URL as string, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data?.token) {
            throw new Error(data?.message || "Invalid credentials");
          }

          // ✅ Same logic as before — just typed properly
          return {
            id: data.user_id.toString(),
            name: data.user_display_name,
            email: data.user_email,
            token: data.token,
          } as User & { token: string };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User & { token?: string };
    }): Promise<JWT> {
      if (user?.token) token.accessToken = user.token;
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { accessToken?: string };
    }): Promise<Session> {
      (session as Session & { accessToken?: string }).accessToken =
        token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };

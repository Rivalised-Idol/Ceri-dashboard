import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    Credentials({
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

          // Return user info for session storage
          return {
            id: data.user_id,
            name: data.user_display_name,
            email: data.user_email,
            token: data.token,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" as const},

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any}) {
      if (user) token.accessToken = user.token;
      return token;
    },
    async session({ session, token }: {session: any; token: any}) {
      (session as any).accessToken = token.accessToken;
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

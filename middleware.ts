import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // 🟢 Redirect logged-in users away from /login
    if (pathname === "/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url)); // dashboard
    }

    // 🛑 Redirect logged-out users trying to access protected pages
    if (!req.nextauth.token && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Always run middleware, we handle redirects manually
    },
  }
);

export const config = {
  matcher: [
    "/", // dashboard
    "/login", // handle reverse redirect
    "/users/:path*",
    "/servers/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};




// export const config = {
//   matcher: [
//     "/", // Protect the root route (dashboard home)
//     "/users/:path*",
//     "/servers/:path*",
//     "/orders/:path*",
//     "/products/:path*",
//     "/reports/:path*",
//     "/settings/:path*",
//   ],
// };
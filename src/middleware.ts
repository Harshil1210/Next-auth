import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    // ✅ Allow unauthenticated users to access login page
    if (pathname === "/login") {
      // If the user is already logged in, redirect to dashboard
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.next();
      }
    }

    // ✅ Protect /dashboard routes
    if (!req.nextauth.token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If token exists, user is authorized
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

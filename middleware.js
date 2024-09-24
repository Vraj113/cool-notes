import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

import { getServerSession } from "next-auth";
import { authOptions } from "../notes/app/api/auth/[...nextauth]/route";

export async function middleware(request) {
  const cookieStore = cookies();
  // const session = await getServerSession(authOptions);
  // console.log(session);
  const token =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;
  const { pathname } = request.nextUrl;
  // Allow access to the login page without a token

  if (pathname === "/login") {
    if (token) {
      // If logged in, redirect away from login page to home
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated for other protected routes
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"], // Define paths for middleware
};

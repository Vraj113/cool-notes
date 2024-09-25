import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request) {
  const cookieStore = cookies();

  const token =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (token) {
    try {
      // Convert the secret into a Uint8Array
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

      // Verify the token with the secret
      var decoded = await jose.jwtVerify(token, secret);
    } catch (error) {
      console.error("Token verification error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const { pathname } = request.nextUrl;

  // Allow access to the login page without a token
  if (pathname === "/admin") {
    let email = decoded.payload.email;
    let authorized_email = process.env.AUTHORIZED_EMAIL;

    if (email === authorized_email) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
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
  matcher: ["/", "/login", "/admin"], // Define paths for middleware
};

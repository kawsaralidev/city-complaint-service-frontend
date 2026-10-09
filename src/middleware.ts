import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Allow the request to continue if either auth cookie exists.
  // This is only a preliminary check, not token validation.
  if (accessToken || refreshToken) {
    return NextResponse.next();
  }

  // No authentication cookies: redirect to login.
  const loginUrl = new URL("/login", request.url);

  // Preserve the requested dashboard path and query parameters.
  const requestedUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  loginUrl.searchParams.set("redirect", requestedUrl);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

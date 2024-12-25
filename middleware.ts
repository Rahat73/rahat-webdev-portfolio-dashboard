import { NextResponse, NextRequest } from "next/server";

import { getCurrentUser } from "./services/auth-service";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (pathname === "/login") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/skills",
    "/experience",
    "/persona-projects",
    "/blogs",
  ],
};

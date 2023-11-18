import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (token && req.nextUrl.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Terapkan middleware ke rute /sign-in
export const config = {
  matcher: ["/sign-in"], // Terapkan hanya pada rute sign-in
};

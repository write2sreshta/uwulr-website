import { NextRequest, NextResponse } from "next/server";
import { unsealData } from "iron-session";
import type { SessionData } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/dashboard")) return NextResponse.next();
  if (pathname === "/dashboard/login") return NextResponse.next();

  const cookieValue = request.cookies.get("uwulr-session")?.value;
  if (!cookieValue) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  try {
    const session = await unsealData<SessionData>(cookieValue, {
      password: process.env.SESSION_SECRET!,
    });

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }

    if (pathname.startsWith("/dashboard/admin") && session.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

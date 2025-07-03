import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronOptions } from "@/lib/iron-config/ironOptions";
import { getIronSession, IronSessionData } from "iron-session";

// All routes that are considered public (accessible without authentication)
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password", "/terms"];

// Only these routes should redirect logged‑in users away (exclude /terms)
const PUBLIC_ROUTES_FOR_AUTH = ["/login", "/register", "/forgot-password"];

const HOME_PAGE = "/";

export async function sessionAuthMiddleware(
  req: NextRequest
): Promise<NextResponse | void> {
  const pathname = req.nextUrl.pathname;

  // Skip auth check for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|apng)$/i)
  ) {
    return;
  }

  const response = NextResponse.next();
  const ironOptions = await getIronOptions();
  const session = await getIronSession<IronSessionData>(
    req as any,
    response as any,
    ironOptions
  );

  const isLoggedIn = session?.isLoggedIn;
  const hasAccessToken = session?.user?.access_token;

  // If logged in, redirect away from routes in PUBLIC_ROUTES_FOR_AUTH (not including /terms)
  if (
    isLoggedIn &&
    hasAccessToken &&
    PUBLIC_ROUTES_FOR_AUTH.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL(HOME_PAGE, req.url));
  }

  // If not logged in, redirect away from protected routes (those not in PUBLIC_ROUTES)
  if (!isLoggedIn || !hasAccessToken) {
    if (!PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return;
}

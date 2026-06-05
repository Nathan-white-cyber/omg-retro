import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/account", "/account/orders", "/account/wishlist"];
const guestOnlyRoutes = ["/login", "/register"];
const sessionCookieNames = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = sessionCookieNames.some((cookieName) =>
    Boolean(request.cookies.get(cookieName)),
  );
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isGuestOnly = guestOnlyRoutes.includes(pathname);

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGuestOnly && hasSession) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/login", "/register"],
};

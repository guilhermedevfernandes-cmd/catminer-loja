import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "catminer_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/admin/auth");

  if ((!isAdminApi && !isAdminPage) || isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isValid = await verifyToken(token);

  if (isValid) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Nao autenticado." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

async function verifyToken(token?: string) {
  const secret = process.env.SESSION_SECRET || process.env.AUTH_SECRET;

  if (!token || !secret) {
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

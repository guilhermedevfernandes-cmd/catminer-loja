import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "catminer_admin_session";

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: "ADMIN" | "OPERATOR";
};

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET não configurada.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(session: AdminSession) {
  return new SignJWT({
    email: session.email,
    name: session.name,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifyAdminSessionToken(token?: string | null): Promise<AdminSession | null> {
  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, getSecret());

    return {
      sub: verified.payload.sub || "",
      email: String(verified.payload.email || ""),
      name: String(verified.payload.name || ""),
      role: verified.payload.role === "OPERATOR" ? "OPERATOR" : "ADMIN",
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Sessão admin obrigatória.");
  }

  return session;
}

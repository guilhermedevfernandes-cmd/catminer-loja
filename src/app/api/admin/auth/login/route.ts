import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";

  if (isRateLimited(`admin-login:${ip}`, 8, 60_000)) {
    return NextResponse.json({ error: "Muitas tentativas. Tente novamente em instantes." }, { status: 429 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Credenciais invalidas." }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  if (!admin) {
    return NextResponse.json({ error: "Credenciais invalidas." }, { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(parsed.data.password, admin.passwordHash);

  if (!isValidPassword) {
    return NextResponse.json({ error: "Credenciais invalidas." }, { status: 401 });
  }

  const token = await createAdminSessionToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  const response = NextResponse.json({
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

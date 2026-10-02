import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSession,
  getCredentials,
  safeEqual,
  safeNext,
} from "@/design-system/auth/session";

/** Login: valida credenciais e grava o cookie de sessão (httpOnly, secure, sameSite strict). */
export async function POST(req: Request) {
  const { user, password, secret } = getCredentials();
  if (!password || !secret) {
    return NextResponse.json({ ok: true, next: "/design-system" });
  }

  let body: { user?: string; password?: string; next?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  const ok =
    safeEqual(
      String(body.user ?? "")
        .trim()
        .toLowerCase(),
      user.toLowerCase(),
    ) && safeEqual(String(body.password ?? ""), password);
  if (!ok) {
    // Atraso fixo desestimula tentativas em sequência.
    await new Promise((r) => setTimeout(r, 700));
    return NextResponse.json({ ok: false, error: "Usuário ou senha incorretos." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, next: safeNext(body.next) });
  res.cookies.set(SESSION_COOKIE, await createSession(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/design-system",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return res;
}

/** Logout: remove a sessão. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/design-system", maxAge: 0 });
  return res;
}

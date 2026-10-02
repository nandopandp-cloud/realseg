import { NextResponse, type NextRequest } from "next/server";
import { AUTH_PATH, LOGIN_PATH, SESSION_COOKIE, getCredentials, verifySession } from "@/design-system/auth/session";

/**
 * Protege o Design System (material interno) com sessão própria e tela de acesso da marca.
 *
 * Variáveis de ambiente (Vercel > Settings > Environment Variables):
 *   DESIGN_SYSTEM_PASSWORD  obrigatória em produção
 *   DESIGN_SYSTEM_USER      opcional (padrão: "realseg")
 *   DESIGN_SYSTEM_SECRET    opcional (assinatura do cookie; padrão: derivado da senha)
 *
 * Sem senha configurada:
 *   - desenvolvimento: acesso livre;
 *   - produção: todas as rotas respondem 404 (falha fechada, nada é exposto).
 */
export async function proxy(request: NextRequest) {
  const { password, secret } = getCredentials();
  const { pathname, search } = request.nextUrl;

  if (!password || !secret) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Not Found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow" } });
    }
    return privateHeaders(NextResponse.next());
  }

  // Tela de acesso e endpoint de login são públicos (dentro da área com noindex).
  if (pathname === LOGIN_PATH || pathname === AUTH_PATH) return privateHeaders(NextResponse.next());

  if (await verifySession(request.cookies.get(SESSION_COOKIE)?.value, secret)) {
    return privateHeaders(NextResponse.next());
  }

  // Imagens e arquivos: 401 simples. Páginas: redireciona para a tela de acesso.
  if (pathname.startsWith("/design-system/brandbook/")) {
    return new NextResponse("Unauthorized", { status: 401, headers: { "X-Robots-Tag": "noindex, nofollow" } });
  }
  const url = request.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return privateHeaders(NextResponse.redirect(url));
}

function privateHeaders(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: ["/design-system", "/design-system/:path*"],
};

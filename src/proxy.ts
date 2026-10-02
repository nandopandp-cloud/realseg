import { NextResponse, type NextRequest } from "next/server";

/**
 * Protege o Design System (material interno) com HTTP Basic Auth.
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *   DESIGN_SYSTEM_PASSWORD  obrigatória em produção
 *   DESIGN_SYSTEM_USER      opcional (padrão: "realseg")
 *
 * Sem senha configurada:
 *   - desenvolvimento: acesso livre (com aviso no header da resposta);
 *   - produção: a rota responde 404 — falha fechada, nada é exposto.
 */
export function proxy(request: NextRequest) {
  const password = process.env.DESIGN_SYSTEM_PASSWORD;
  const user = process.env.DESIGN_SYSTEM_USER || "realseg";

  if (!password) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Not Found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow" } });
    }
    return withPrivateHeaders(NextResponse.next());
  }

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const [u, ...rest] = atob(header.slice(6)).split(":");
    if (safeEqual(u, user) && safeEqual(rest.join(":"), password)) {
      return withPrivateHeaders(NextResponse.next());
    }
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="RealSeg Design System", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function withPrivateHeaders(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

/** Comparação em tempo constante (evita timing attacks triviais). */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/design-system", "/design-system/:path*"],
};

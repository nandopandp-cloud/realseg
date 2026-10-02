/**
 * Sessão da área interna do Design System.
 * Cookie assinado com HMAC-SHA256 (Web Crypto: funciona no proxy e em route handlers).
 * Formato do valor: `<expiraEmMs>.<assinaturaBase64url>`
 */

export const SESSION_COOKIE = "rs_ds_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas
export const LOGIN_PATH = "/design-system/acesso";
export const AUTH_PATH = "/design-system/auth";

export function getCredentials() {
  const password = process.env.DESIGN_SYSTEM_PASSWORD;
  const user = process.env.DESIGN_SYSTEM_USER || "realseg";
  // O segredo da assinatura deriva da senha quando não houver um dedicado:
  // trocar a senha invalida todas as sessões abertas.
  const secret = process.env.DESIGN_SYSTEM_SECRET || (password ? `rs-ds::${user}::${password}` : undefined);
  return { user, password, secret };
}

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer) {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return b64url(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
}

export async function createSession(secret: string) {
  const exp = String(Date.now() + SESSION_TTL_MS);
  return `${exp}.${await sign(exp, secret)}`;
}

export async function verifySession(value: string | undefined, secret: string) {
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await sign(exp, secret));
}

/** Comparação em tempo constante. */
export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Só aceita destinos internos do Design System (evita open redirect). */
export function safeNext(next: string | null | undefined) {
  if (!next || !next.startsWith("/design-system") || next.startsWith("//") || next.startsWith(LOGIN_PATH))
    return "/design-system";
  return next;
}

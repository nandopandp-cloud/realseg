import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Serve as páginas do Brandbook (fora de /public) somente através da rota protegida.
 * Lista fechada de arquivos: nenhum caminho arbitrário é aceito.
 */
const PAGES = new Set([
  "00-capa",
  "01-essencia",
  "03-paleta",
  "04-tipografia",
  "05-botoes",
  "06-componentes",
  "07-icones",
  "08-elementos",
  "09-imagem",
]);

export async function GET(_req: Request, ctx: { params: Promise<{ page: string }> }) {
  const { page } = await ctx.params;
  if (!PAGES.has(page)) return new Response("Not Found", { status: 404 });
  const file = await readFile(path.join(process.cwd(), "src/design-system/assets/brandbook", `${page}.jpg`));
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, max-age=3600",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/**
 * Clientes exibidos na faixa de confiança.
 * PLACEHOLDER: nomes retirados da referência visual. Substituir por logos
 * oficiais (SVG em /public/clients) e confirmar autorização de uso de marca.
 */
export type Client = {
  name: string;
  /** Estilo tipográfico do wordmark enquanto não há SVG oficial. */
  style: "serif" | "wide" | "mono" | "bold" | "light";
  sub?: string;
  logo?: string;
};

export const clients: Client[] = [
  { name: "Prima Qualità", sub: "Saúde", style: "bold" },
  { name: "IDEAS", style: "wide" },
  { name: "Bairro Harmonia", style: "light" },
  { name: "SELLIX", sub: "Ambiental", style: "mono" },
  { name: "Terras do Lençóis", style: "serif" },
];

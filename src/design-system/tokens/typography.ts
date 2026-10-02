/**
 * RealSeg: Typography tokens
 * Fonte: Brandbook v1.0 · 04 Tipografia. Família principal: Inter.
 * JetBrains Mono é reservada a DADOS (coordenadas, placas, timestamps, códigos).
 */

export const fontFamily = {
  sans: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  data: "var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export type TypeToken = {
  size: string;
  lineHeight: string;
  letterSpacing: string;
  weight: number;
  uppercase?: boolean;
  family?: keyof typeof fontFamily;
  /** Faixa em px para documentação. */
  range: string;
  use: string;
};

export const typeScale = {
  "display-xl": {
    size: "clamp(3.5rem, 7vw, 6rem)",
    lineHeight: "0.9",
    letterSpacing: "-0.04em",
    weight: 800,
    uppercase: true,
    range: "56 a 96px",
    use: "Hero. Uma por página.",
  },
  "display-lg": {
    size: "clamp(2.75rem, 5.2vw, 4.5rem)",
    lineHeight: "0.92",
    letterSpacing: "-0.035em",
    weight: 800,
    uppercase: true,
    range: "44 a 72px",
    use: "Abertura de seção de alto impacto.",
  },
  "display-md": {
    size: "clamp(2.25rem, 4vw, 3.5rem)",
    lineHeight: "0.95",
    letterSpacing: "-0.03em",
    weight: 800,
    uppercase: true,
    range: "36 a 56px",
    use: "Títulos de seção.",
  },
  "heading-xl": {
    size: "clamp(1.75rem, 2.6vw, 2.5rem)",
    lineHeight: "1.05",
    letterSpacing: "-0.025em",
    weight: 800,
    range: "28 a 40px",
    use: "Títulos de página em produtos.",
  },
  "heading-lg": {
    size: "clamp(1.5rem, 2vw, 2rem)",
    lineHeight: "1.15",
    letterSpacing: "-0.02em",
    weight: 700,
    range: "24 a 32px",
    use: "Títulos de bloco, modais.",
  },
  "heading-md": {
    size: "1.25rem",
    lineHeight: "1.3",
    letterSpacing: "-0.015em",
    weight: 700,
    range: "20px",
    use: "Títulos de card e painel.",
  },
  "heading-sm": {
    size: "1rem",
    lineHeight: "1.35",
    letterSpacing: "-0.01em",
    weight: 700,
    range: "16px",
    use: "Subtítulos, títulos compactos.",
  },
  "body-lg": {
    size: "1.125rem",
    lineHeight: "1.6",
    letterSpacing: "0",
    weight: 400,
    range: "18px",
    use: "Lead / subtítulo de seção.",
  },
  "body-md": {
    size: "1rem",
    lineHeight: "1.6",
    letterSpacing: "0",
    weight: 400,
    range: "16px",
    use: "Texto corrido padrão.",
  },
  "body-sm": {
    size: "0.875rem",
    lineHeight: "1.6",
    letterSpacing: "0",
    weight: 400,
    range: "14px",
    use: "Descrições, células de tabela.",
  },
  "label-lg": {
    size: "0.9375rem",
    lineHeight: "1.3",
    letterSpacing: "0",
    weight: 600,
    range: "15px",
    use: "Labels de formulário, navegação.",
  },
  "label-md": {
    size: "0.8125rem",
    lineHeight: "1.3",
    letterSpacing: "0.01em",
    weight: 600,
    range: "13px",
    use: "Labels compactos, abas.",
  },
  "label-sm": {
    size: "0.75rem",
    lineHeight: "1.3",
    letterSpacing: "0.01em",
    weight: 600,
    range: "12px",
    use: "Metadados, legendas.",
  },
  micro: {
    size: "0.6875rem",
    lineHeight: "1.2",
    letterSpacing: "0.16em",
    weight: 700,
    uppercase: true,
    range: "11px",
    use: "Kicker, status, HUD. Sempre uppercase.",
  },
  data: {
    size: "0.75rem",
    lineHeight: "1.4",
    letterSpacing: "0.02em",
    weight: 500,
    family: "data",
    range: "12px",
    use: "Placas, coordenadas, timestamps, IDs de câmera.",
  },
} as const satisfies Record<string, TypeToken>;

export type TypeScaleName = keyof typeof typeScale;

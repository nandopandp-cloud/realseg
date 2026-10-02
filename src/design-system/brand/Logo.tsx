import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Sistema de logo RealSeg.
 * - full: símbolo + wordmark (principal)
 * - symbol: somente o símbolo (avatar, favicon, espaços reduzidos)
 * - wordmark: somente a palavra REALSEG (quando o símbolo já está presente)
 * - reduced: símbolo + wordmark sem a assinatura "Security Intelligence"
 *
 * Tons: "dark" (fundos escuros, padrão) · "light" (fundos claros) · "white" · "midnight" · "cyan" (monocromáticos)
 *
 * Nunca alterar proporção, estrutura ou espaçamento interno.
 * TODO: substituir os PNGs por SVG master quando o arquivo vetorial oficial estiver disponível.
 */
type Tone = "dark" | "light" | "white" | "midnight" | "cyan";
type Variant = "full" | "reduced" | "symbol" | "wordmark";

const files: Record<Variant, Partial<Record<Tone, { src: string; w: number; h: number }>>> = {
  full: {
    dark: { src: "/brand/logo/full-dark.png", w: 364, h: 88 },
    light: { src: "/brand/logo/full-light.png", w: 364, h: 88 },
    white: { src: "/brand/logo/full-white.png", w: 364, h: 88 },
    midnight: { src: "/brand/logo/full-midnight.png", w: 364, h: 88 },
    cyan: { src: "/brand/logo/full-cyan.png", w: 364, h: 88 },
  },
  reduced: {},
  symbol: {
    dark: { src: "/brand/logo/symbol-cyan.png", w: 116, h: 88 },
    cyan: { src: "/brand/logo/symbol-cyan.png", w: 116, h: 88 },
    light: { src: "/brand/logo/symbol-light.png", w: 116, h: 88 },
    white: { src: "/brand/logo/symbol-white.png", w: 116, h: 88 },
    midnight: { src: "/brand/logo/symbol-midnight.png", w: 116, h: 88 },
  },
  wordmark: {
    dark: { src: "/brand/logo/wordmark-white.png", w: 229, h: 29 },
    white: { src: "/brand/logo/wordmark-white.png", w: 229, h: 29 },
    light: { src: "/brand/logo/wordmark-midnight.png", w: 229, h: 29 },
    midnight: { src: "/brand/logo/wordmark-midnight.png", w: 229, h: 29 },
    cyan: { src: "/brand/logo/wordmark-cyan.png", w: 229, h: 29 },
  },
};
files.reduced = files.full;

/** Tamanhos mínimos (altura em px): abaixo disso, use o símbolo. */
export const logoMinHeight = { full: 24, reduced: 20, symbol: 16, wordmark: 12 } as const;

export function Logo({
  variant = "full",
  tone = "dark",
  height = 36,
  tagline = variant === "full",
  className,
  priority,
}: {
  variant?: Variant;
  tone?: Tone;
  /** Altura em px. Respeita o mínimo do variant. */
  height?: number;
  tagline?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const f = files[variant][tone] ?? files[variant].dark!;
  const h = Math.max(height, logoMinHeight[variant]);
  const taglineColor = tone === "light" || tone === "midnight" ? "text-inverse/70" : "text-muted";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={f.src}
        alt="RealSeg"
        width={f.w}
        height={f.h}
        preload={priority}
        style={{ height: h, width: "auto" }}
      />
      {tagline && (
        <span
          className={cn(
            "type-micro hidden border-l border-current/20 pl-3 text-[9px] leading-[1.35] sm:block",
            taglineColor,
          )}
        >
          Security
          <br />
          Intelligence
        </span>
      )}
    </span>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusDot, type StatusTone } from "@/design-system/components/primitives/Indicators";

/**
 * Badge — status, categoria, tecnologia, segurança e LIVE.
 * - status: preenchido sólido, com ponto (ONLINE, ALERTA, CRÍTICO)
 * - soft: fundo translúcido (estado secundário)
 * - outline: categorias e tags (Cidades, IA, LPR)
 */
type Variant = "status" | "soft" | "outline";

const solid: Record<StatusTone, string> = {
  accent: "bg-cyan text-inverse",
  success: "bg-success text-inverse",
  warning: "bg-warning text-inverse",
  critical: "bg-critical text-inverse",
  info: "bg-info text-inverse",
  neutral: "bg-surface text-fg",
};
const soft: Record<StatusTone, string> = {
  accent: "bg-cyan/10 text-cyan border-cyan/30",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  critical: "bg-critical/10 text-critical border-critical/35",
  info: "bg-info/10 text-info border-info/30",
  neutral: "bg-white/[0.04] text-fg-secondary border-line",
};

export function Badge({
  children,
  tone = "accent",
  variant = "soft",
  dot,
  live,
  className,
}: {
  children: ReactNode;
  tone?: StatusTone;
  variant?: Variant;
  /** Exibe ponto de status. */
  dot?: boolean;
  /** Ponto pulsante (estado ao vivo). Implica `dot`. */
  live?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "type-micro inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-rs-xs px-2 text-[10px] tracking-[0.12em]",
        variant === "status" && solid[tone],
        variant === "soft" && cn("border", soft[tone]),
        variant === "outline" &&
          "border border-cyan/35 text-fg-secondary normal-case tracking-normal font-semibold text-xs h-7 px-2.5 rounded-rs-sm",
        className,
      )}
    >
      {(dot || live) &&
        (variant === "status" ? (
          <span className="relative inline-flex size-1.5">
            {live && <span className="absolute inset-0 animate-rs-pulse rounded-full bg-current opacity-70" />}
            <span className="relative size-1.5 rounded-full bg-current" />
          </span>
        ) : (
          <StatusDot tone={tone} live={!!live} />
        ))}
      {children}
    </span>
  );
}

/** Tag interativa (filtros). */
export function Tag({
  children,
  selected,
  onClick,
  className,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rs-focus inline-flex h-8 items-center gap-1.5 rounded-rs-sm border px-3 text-xs font-semibold transition-[border-color,background-color,color] duration-(--rs-duration-fast)",
        selected
          ? "border-cyan bg-cyan/10 text-cyan"
          : "border-line text-fg-secondary hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {children}
    </button>
  );
}

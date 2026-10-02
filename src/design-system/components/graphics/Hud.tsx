"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn, positioned } from "@/lib/utils";
import { useClock } from "@/design-system/hooks";
import { StatusDot, type StatusTone } from "@/design-system/components/primitives/Indicators";

const toneText: Record<StatusTone, string> = {
  accent: "text-cyan",
  success: "text-success",
  warning: "text-warning",
  critical: "text-critical",
  info: "text-info",
  neutral: "text-muted",
};
const toneHex: Record<StatusTone, string> = {
  accent: "#00E6D1",
  success: "#39E58C",
  warning: "#FFB84D",
  critical: "#FF5C67",
  info: "#5AA9FF",
  neutral: "#8295A6",
};

/**
 * SecurityHUD: painel técnico flutuante (Layer 3).
 * title · status · metadata · coordenadas · timestamp · indicador.
 * Conteúdo de exemplo deve ser sinalizado como ilustrativo.
 */
export function SecurityHUD({
  title,
  status,
  tone = "accent",
  metadata,
  coordinates,
  timestamp,
  indicator,
  framed = true,
  children,
  className,
}: {
  title: string;
  status?: string;
  tone?: StatusTone;
  metadata?: Array<{ label: string; value: string }>;
  coordinates?: string;
  /** `true` = relógio ao vivo; string = valor fixo. */
  timestamp?: boolean | string;
  indicator?: { label: string; value: number; display?: string };
  framed?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const clock = useClock();
  const ts = timestamp === true ? clock : timestamp;
  return (
    <div className={cn("rs-glass min-w-52 rounded-rs-sm p-3.5", positioned(className), className)}>
      {/* Frame em camada própria: rs-glass e rs-frame usam a propriedade background. */}
      {framed && (
        <span
          aria-hidden
          className="rs-frame pointer-events-none absolute inset-0"
          style={{ "--rs-frame-color": toneHex[tone], "--rs-frame-size": "8px" } as CSSProperties}
        />
      )}
      <div className="flex items-center justify-between gap-4">
        <span className="type-micro text-[10px] text-fg">{title}</span>
        {status && (
          <span className={cn("type-micro flex items-center gap-1.5 text-[9px]", toneText[tone])}>
            <StatusDot tone={tone} /> {status}
          </span>
        )}
      </div>
      {children && <div className="mt-3">{children}</div>}
      {metadata && (
        <dl className="mt-3 space-y-1.5">
          {metadata.map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-4">
              <dt className="type-micro text-[9px] text-subtle">{m.label}</dt>
              <dd className="font-data text-[11px] text-fg-secondary">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {indicator && (
        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="type-micro text-[9px] text-muted">{indicator.label}</span>
            <span className="font-data text-lg font-semibold text-fg tabular-nums">
              {indicator.display ?? `${indicator.value}%`}
            </span>
          </div>
          <div className="mt-1.5 h-px bg-white/10">
            <div
              className="h-px bg-cyan shadow-[0_0_8px_rgb(0_230_209)]"
              style={{ width: `${Math.min(100, indicator.value)}%` }}
            />
          </div>
        </div>
      )}
      {(coordinates || ts) && (
        <div className="mt-3 flex items-center justify-between gap-4 border-t border-line-subtle pt-2 font-data text-[10px] text-subtle">
          <span>{coordinates}</span>
          <span className="tabular-nums">{ts}</span>
        </div>
      )}
    </div>
  );
}

/**
 * SecurityTarget: elemento de foco / bounding box. Identificação e destaque.
 * `lock` executa a animação de travamento ao montar.
 */
export function SecurityTarget({
  label,
  score,
  tone = "accent",
  crosshair = false,
  lock = false,
  size = 12,
  className,
  style,
}: {
  label?: string;
  score?: string;
  tone?: StatusTone;
  crosshair?: boolean;
  lock?: boolean;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const c = toneHex[tone];
  return (
    <div
      aria-hidden
      className={cn(
        "rs-frame",
        positioned(className),
        lock && "rs-motion animate-[rs-lock_700ms_var(--rs-ease-standard)_both]",
        className,
      )}
      style={
        {
          "--rs-frame-color": c,
          "--rs-frame-size": `${size}px`,
          boxShadow: `inset 0 0 0 1px ${c}22`,
          ...style,
        } as CSSProperties
      }
    >
      {crosshair && (
        <>
          <span
            className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2"
            style={{ background: c }}
          />
          <span
            className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2"
            style={{ background: c }}
          />
        </>
      )}
      {label && (
        <span
          className="type-micro absolute -top-[19px] left-0 flex items-center gap-1.5 whitespace-nowrap rounded-[2px] px-1.5 py-[3px] text-[8px] tracking-[0.12em] text-inverse"
          style={{ background: c }}
        >
          {label}
          {score && <span className="opacity-70">{score}</span>}
        </span>
      )}
    </div>
  );
}

/** SecurityNode: ponto de rede (câmera, sensor, evento). */
export function SecurityNode({
  tone = "accent",
  size = "md",
  pulse = true,
  label,
  className,
  style,
}: {
  tone?: StatusTone;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const c = toneHex[tone];
  const d = { sm: 6, md: 10, lg: 14 }[size];
  return (
    <span aria-hidden className={cn("relative inline-flex items-center gap-2", className)} style={style}>
      <span className="relative grid place-items-center" style={{ width: d * 3, height: d * 3 }}>
        {pulse && (
          <span
            className="absolute inset-[30%] animate-rs-pulse rounded-full"
            style={{ background: c, opacity: 0.5 }}
          />
        )}
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: `${c}40` }} />
        <span
          className="relative rounded-full"
          style={{ width: d, height: d, background: c, boxShadow: `0 0 ${d}px ${c}` }}
        />
      </span>
      {label && (
        <span className="type-micro text-[9px]" style={{ color: c }}>
          {label}
        </span>
      )}
    </span>
  );
}

/** SecurityDataPoint: dado extraído com linha de ligação. */
export function SecurityDataPoint({
  label,
  value,
  side = "right",
  className,
}: {
  label: string;
  value: string;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center", side === "left" && "flex-row-reverse", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgb(0_230_209)]" />
      <span aria-hidden className="h-px w-8 bg-linear-to-r from-cyan to-cyan/20" />
      <span className="rs-glass rounded-rs-xs px-2.5 py-1.5">
        <span className="type-micro block text-[8px] text-muted">{label}</span>
        <span className="mt-0.5 block font-data text-sm text-fg">{value}</span>
      </span>
    </div>
  );
}

/** SecurityLens: anéis concêntricos: visão e foco (assinatura "Lens"). */
export function SecurityLens({ size = 120, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden className={className}>
      <circle cx="60" cy="60" r="56" fill="none" stroke="rgb(0 230 209 / 0.25)" />
      <circle
        cx="60"
        cy="60"
        r="44"
        fill="none"
        stroke="rgb(0 230 209 / 0.5)"
        strokeDasharray="60 12 4 12"
        className="rs-motion origin-center animate-rs-sweep [animation-duration:18s] [transform-box:fill-box]"
      />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#00E6D1" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="16" fill="rgb(0 230 209 / 0.12)" stroke="rgb(0 230 209 / 0.6)" />
      <circle cx="54" cy="54" r="3" fill="rgb(245 251 255 / 0.7)" />
    </svg>
  );
}

/** Scan flare: cruz de luz (assinatura "Scan"). */
export function ScanFlare({ size = 120, className }: { size?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("relative", className)} style={{ width: size, height: size }}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-cyan to-transparent" />
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan to-transparent" />
      <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-light shadow-[0_0_24px_8px_rgb(0_230_209/0.55)]" />
    </div>
  );
}
